# AGENTS.md
Agent guidelines for automated agents in this repo.

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19
- **Styling:** Tailwind CSS 4, DaisyUI 5, Radix UI Primitives
- **Database:** Drizzle ORM, LibSQL (Turso)
- **State Management:** React Query, SWR
- **Auth:** NextAuth.js v4
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint 9, Stylelint

## General Rules
- **Do not make any Git commits.**
- Use modern ES7+ syntax.
- **Package Manager:** `pnpm` (do not use npm or yarn).

## Commands
- **Development:** `pnpm dev` (Runs on port 3001)
- **Build:** `pnpm build`
- **Serve:** `pnpm start` or `pnpm serve` (if alias exists)
- **Test:** `pnpm test` (Run Jest)
- **Database:**
  - `pnpm db:push` (Push schema changes)
  - `pnpm db:studio` (Open Drizzle Studio)
- **Linting:**
  - `pnpm lint` (Lint JS & CSS)
  - `pnpm lint:fix` (Fix JS & CSS)
  - `pnpm lint:js` (Lint JS only)
  - `pnpm lint:js:fix` (Fix JS only)
  - `pnpm lint:css` (Lint CSS only)

## Code Style Guidelines
- **Indentation:** 4 spaces.
- **Line Endings:** Unix (LF).
- **Quotes:** Single quotes.
- **Semicolons:** None.
- **Parens:** Arrow function parens only when needed.
- **Max Line Length:** 120 characters.
- **Extensions:** `.jsx` for components, `.js` for logic/utilities.
- **Imports:** Use aliases (e.g., `import X from '@/components/X'`) instead of relative paths.
- **Spacing:**
  - Space before blocks (`if (...) {`).
  - Space after keywords (`if`, `for`, `return`).
  - Blank lines between imports, declarations, and blocks.
- **Naming:** `PascalCase` for components, `camelCase` for variables/functions.
- **React:**
  - Functional components with Hooks.
  - Avoid inline `z-index` (use Tailwind classes or config).
  - JSDoc types in `typedefs.js` or inline JSDoc.
- **Global Variables:** `Logger` is available globally.
- **Check Your Work:** Always run `pnpm lint` before committing.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/components`: React components (PascalCase).
- `src/db`: Drizzle schema and DB utilities.
- `src/lib`: Shared utilities, actions, hooks.
- `src/store`: Global state stores.
- `src/constants.js`: Project constants.
