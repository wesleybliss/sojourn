## Goal

- Use **only Google Sign-In** end-to-end.
- **Remove NextAuth completely**: server routes, client hooks, dependency, env vars, etc.
- Use **Firebase Authentication** (Google provider) as the auth mechanism.
- Keep existing data model workable: the app still needs a stable internal `userId` to relate trips.

## Decisions locked in (per Wes)

- **Identity mapping:** use `users.firebaseUid` as the canonical identity (unique).
- **Existing users:** on first Google sign-in, if `firebaseUid` lookup misses, attempt to match by normalized email and "claim" that legacy row by setting `firebaseUid`.
- **Beta access control:** add `users.enabled` (boolean).
    - Any user can complete Google sign-in.
    - If the mapped DB user is not enabled yet, the app prompts for invite code.
    - When correct invite code is provided, set `enabled = true`.
    - Once enabled, the user is never prompted again.

This replaces the current email/password signup route and avoids requiring invite code before Google sign-in.

## Edge cases / support policy

- **Email match but already claimed:** if a legacy email matches an existing `users` row that already has a *different* `firebaseUid`, reject the sign-in / provisioning with a user-facing message to contact support for manual review.
- **Token has no email:** if Firebase does not provide an email (rare for Google provider), reject and ask the user to retry or contact support.

## Key design decisions to make (need your input)

1. **How should we map Firebase users to DB users?**
    - Option A (recommended): add `users.firebaseUid` (unique) and treat that as the identity source.
    - Option B: use email as identity (less reliable: email can change; also collisions).

2. **What to do with existing email/password accounts in the DB?**
    - Option A: one-time migration: on first Google login, if email matches an existing user, link to that row.
    - Option B: keep separate; require manual admin merge.
    - Option C: wipe/ignore old users for this project.

3. **Do you still want an invite code gate?** (Today: `INVITE_CODE` on `/api/auth/signup`)
    - If yes, we’ll enforce it on first Google sign-in (server-side) before creating/linking a DB user.
    - If no, remove invite logic and related UI.

4. **Sign-in UX**: popup vs redirect.
    - Popup is simplest.
    - Redirect is more robust on mobile/Safari.

Reply with your choices for (1)-(3) at minimum.

## Proposed architecture (Firebase Auth + server-verified ID tokens)

### Client (browser)

- Use Firebase JS SDK to:
    - Trigger Google sign-in (popup or redirect).
    - Maintain client-side auth state.
    - Obtain an **ID token** via `currentUser.getIdToken()`.

- For API calls (fetch), send the ID token as:
    - `Authorization: Bearer <firebase_id_token>`

(Alternative: a server-issued Firebase session cookie. Optional; adds complexity but can improve SSR/middleware options.)

### Server (Next.js route handlers)

- Use **Firebase Admin SDK** to verify incoming ID tokens:
    - Validate JWT signature + audience/issuer.
    - Extract `uid`, `email`.

- Map Firebase user → internal DB user:
    - `getOrCreateUser({ firebaseUid, email })`.
    - Store `firebaseUid` and email in `users`.
    - Return internal `userId` used by repos.

### App gating

- Replace `next-auth/react` session usage with a small `AuthProvider` built on Firebase:
    - Expose `user`, `loading`, `signInWithGoogle`, `signOut`.

## Concrete refactor plan (by area)

### 1) Introduce Firebase config + utilities

- Add Firebase client initialization:
    - `src/lib/firebase/client.js` (initializeApp + getAuth)
    - Environment variables: `NEXT_PUBLIC_FIREBASE_*`

- Add Firebase admin initialization:
    - `src/lib/firebase/admin.js` (initializeApp w/ service account / application default credentials)
    - Environment variables:
        - Either `FIREBASE_SERVICE_ACCOUNT` (json string) or discrete vars.
        - Or use Google ADC in hosting env.

### 2) Replace NextAuth client provider + hooks

- Replace `src/components/providers/NextAuthProvider.jsx` with a Firebase-based provider (new file name):
    - e.g. `src/components/providers/AuthProvider.jsx`.
    - Update `src/app/layout.jsx` to wrap with new provider.

- Replace usages:
    - `useSession()` → `useAuth()`.
    - `signIn()` / `signOut()` → Firebase `signInWithPopup` / `auth.signOut()`.

Files to touch:
- `src/components/LoginForm.jsx` (becomes “Continue with Google”)
- `src/components/SignupForm.jsx` (likely removed or repurposed; signup is Google)
- `src/components/ProtectedRoute.jsx`
- `src/components/AccountMenu.jsx`
- `src/components/Navbar/NavbarViewModel.js`

### 3) Replace server-side auth: remove `next-auth/jwt` usage

- Replace token extraction in all API routes:
    - Current: `getToken({ req, secret: process.env.NEXTAUTH_SECRET })`
    - Target: `verifyFirebaseIdToken(request)` reading `Authorization` header.

- Update `src/lib/auth.js` to:
    - Verify Firebase ID token.
    - Map to internal DB user.
    - Return `{ user, firebase, userId }`.
    - Keep `withAuth` and `isUserTripMember` shape similar to minimize churn.

Files to touch:
- `src/lib/auth.js`
- `src/app/api/trips/route.js`
- `src/app/api/trips/backup/route.js` (also remove redundant `getToken` usage inside `withAuth`)
- `src/app/api/trips/restore/route.js`
- `src/app/api/debug/clear-all/route.js`

### 4) Remove NextAuth routes and dependencies

- Delete:
    - `src/app/api/auth/[...nextauth]/route.js`

- Remove NextAuth dependency and env vars:
    - `package.json`: remove `next-auth`
    - `.env*`: remove `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_SECRET` if unused
    - Update docs mentioning NextAuth: `README.md`, `AGENTS.md`, `docs/API_ROUTES.json`, `tasks/offline-first.md`

### 5) Database schema changes (likely required)

Current `users` has `{ email, password }` and `password` is required.

To support Google-only, recommended changes:

- Make `password` nullable (or remove it) and add identity fields:
    - `firebaseUid` (unique, not null)
    - keep `email` unique
    - optionally `name`, `photoUrl`

Migration strategy:
- Drizzle migration to add columns and relax constraints.
- Backfill/linking strategy depends on your decision about existing users.

### 6) Update UI/Routes for login flow

- `/login` page becomes a single Google sign-in button.
- `/signup` page can either:
    - redirect to `/login` (since signup == login), or
    - become an invite-code entry page that then triggers Google sign-in.

### 7) Testing & validation

- Update/replace Jest tests if they assume NextAuth.
- Add minimal tests for:
    - token verification wrapper parsing `Authorization` header
    - `getOrCreateUser` behavior

### 8) Security/operational considerations

- Ensure API routes reject requests without valid Firebase token.
- Consider rate-limiting or abuse protection for user auto-provisioning.
- Ensure Firebase project settings:
    - Authorized domains: localhost:3001 + production domain
    - OAuth consent screen configured
    - Google sign-in provider enabled

## Checklist (implementation tasks)

### Preparation
- [ ] Decide mapping strategy: `firebaseUid` vs email-only
- [ ] Decide how to handle existing DB users (link-by-email vs reset)
- [ ] Decide whether invite code gate remains
- [ ] Create Firebase project + enable Google provider
- [ ] Add authorized domains (localhost:3001, prod)
- [ ] Generate service account credentials for Firebase Admin usage

### Code: Firebase integration
- [ ] Add `firebase` (client SDK) dependency
- [ ] Add `firebase-admin` dependency
- [ ] Add `src/lib/firebase/client.js`
- [ ] Add `src/lib/firebase/admin.js`
- [ ] Add env var documentation + `.env.example` (optional)

### Code: Auth provider + UI
- [ ] Create `AuthProvider` + `useAuth()` hook
- [ ] Replace `NextAuthProvider` usage in `src/app/layout.jsx`
- [ ] Update `ProtectedRoute` to use Firebase auth state
- [ ] Update `AccountMenu` to show Firebase user email + sign out
- [ ] Update Navbar view model session logic
- [ ] Replace `LoginForm` with Google sign-in
- [ ] Remove/repurpose `SignupForm` and `/signup` page

### Code: API auth
- [ ] Replace `src/lib/auth.js` to verify Firebase ID token
- [ ] Implement `getOrCreateUser` using `firebaseUid` (or chosen strategy)
- [ ] Update all API routes using `getToken()` to use new auth
- [ ] Remove redundant token parsing inside routes already wrapped by `withAuth`

### Database
- [ ] Update Drizzle schema for `users` (add `firebaseUid`, make `password` nullable/remove)
- [ ] Generate and run migration (`pnpm db:generate` / `pnpm db:push` as appropriate)
- [ ] Add unique indexes (firebaseUid, email)
- [ ] Implement linking/backfill behavior for existing users (per decision)

### Removal: NextAuth
- [ ] Delete `src/app/api/auth/[...nextauth]/route.js`
- [ ] Remove `next-auth` from `package.json`
- [ ] Remove `NEXTAUTH_*` usage and env vars
- [ ] Update docs mentioning NextAuth

### Verification
- [ ] Manual test: sign in with Google, create trip, list trips
- [ ] Manual test: sign out, ensure protected pages redirect
- [ ] Manual test: API calls fail when no token
- [ ] Run `pnpm test`
- [ ] Run `pnpm lint`
