# Next.js Migration Plan: Vite React to Next.js 14+ App Router

## Project Overview
**Source**: Vite + React client-side only web app
**Target**: Next.js 14+ with App Router (server components by default)
**Migration Type**: Full-stack transformation with SSR/SSG capabilities

## Phase 1: Analysis & Preparation

### Current Architecture Analysis
- **Build System**: Vite with React plugin
- **Routing**: React Router (likely v6)
- **State Management**: Redux-like store structure
- **Styling**: Tailwind CSS with custom components
- **Data**: Client-side API calls, IndexedDB (Dexie)
- **Assets**: Static files in public/ directory

### Dependencies Audit
**Current Key Dependencies**:
- React 18.x
- React Router DOM
- Redux/Redux Toolkit
- Tailwind CSS
- Dexie (IndexedDB)
- Various UI libraries (@radix-ui, etc.)

**Next.js Dependencies to Add**:
- next@latest
- react@latest
- react-dom@latest
- @next/third-parties
- next-themes (for theme switching)

## Phase 2: Project Structure Setup

### Directory Structure Transformation
```
Current (Vite):
├── src/
│   ├── components/
│   ├── routes/
│   ├── store/
│   └── main.jsx
└── public/

New (Next.js):
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── globals.css        # Global styles
│   ├── trips/
│   │   ├── page.js        # Trips list
│   │   └── [tripId]/
│   │       ├── page.js    # Trip detail
│   │       └── loading.js # Loading UI
│   └── api/               # API routes
├── components/
├── lib/                   # Utilities
├── public/
└── styles/
```

### File Migration Strategy
1. **Routes → App Router Pages**: Each route becomes a page.js file
2. **Components → Server/Client Components**: Mark client components with 'use client'
3. **Store → Server State**: Migrate to server components + client state where needed
4. **API Calls → Server Actions**: Move data fetching to server components

## Phase 3: Component Migration

### Component Type Classification
**Server Components (Default)**:
- Layout components
- Data fetching components
- Static content
- SEO-critical components

**Client Components ('use client')**:
- Interactive UI elements
- Form handling
- Real-time updates
- Browser APIs (localStorage, etc.)

### Key Component Migrations

#### 1. App Component
```javascript
// From: src/components/App/App.jsx
// To: app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
```

#### 2. Route Components
```javascript
// From: src/routes/Home/Home.jsx
// To: app/page.js
export default async function HomePage() {
  const trips = await getTrips() // Server-side data fetching
  return <TripsList trips={trips} />
}
```

#### 3. Data Fetching Migration
```javascript
// From: useEffect + fetch
// To: async server components
async function TripDetail({ params }) {
  const trip = await getTrip(params.tripId)
  return <TripCard trip={trip} />
}
```

## Phase 4: State Management Migration

### Redux Store → Server State + Client State
1. **Server State**: Use server components for initial data
2. **Client State**: Use useState/useReducer for UI state
3. **Global State**: Use React Context for shared client state
4. **URL State**: Use search params for filter/sort state

### Database Layer Migration
```javascript
// From: Dexie client-side
// To: Server actions + client-side cache
// lib/actions/trips.js
'use server'
export async function getTrips() {
  // Server-side database access
  return await db.trips.findMany()
}
```

## Phase 5: Styling & Assets

### Tailwind CSS Integration
1. **Move styles**: src/styles/index.css → app/globals.css
2. **Update config**: tailwind.config.js for content paths
3. **Component styles**: Ensure Tailwind classes work with server components

### Asset Handling
- **Public folder**: Remains the same
- **Images**: Use Next.js Image component
- **Fonts**: Use next/font for optimization

## Phase 6: API & Data Layer

### API Routes Migration
```javascript
// From: src/lib/api.js
// To: app/api/[...]/route.js
export async function GET(request) {
  const trips = await getTripsFromDB()
  return Response.json(trips)
}
```

### Client-Side Data Fetching
```javascript
// Use SWR for client-side fetching
import useSWR from 'swr'

function useTrips() {
  const { data, error } = useSWR('/api/trips', fetcher)
  return { trips: data, loading: !data && !error, error }
}
```

## Phase 7: Build & Deployment

### Build Configuration
1. **Remove Vite config**: Delete vite.config.js
2. **Add Next.js config**: Create next.config.js
3. **Update scripts**: package.json build commands
4. **Environment variables**: Update .env handling

### Deployment Setup
- **Vercel**: Optimized for Next.js
- **Static Export**: If needed for static hosting
- **CDN**: Automatic with Next.js

## Phase 8: Testing & Validation

### Testing Strategy
1. **Unit Tests**: Update existing tests for server components
2. **Integration Tests**: Test data fetching and routing
3. **E2E Tests**: Verify user flows work correctly
4. **Performance**: Check Core Web Vitals

### Migration Checklist
- [x] Install Next.js dependencies
- [x] Create app directory structure
- [x] Migrate root layout and pages
- [x] Update routing configuration
- [ ] Migrate components to server/client components
- [ ] Update data fetching patterns
- [ ] Migrate state management
- [ ] Update styling configuration
- [ ] Test all user flows
- [ ] Performance optimization
- [ ] Deploy to production

## Migration Timeline

### Week 1: Foundation
- Set up Next.js project structure
- Migrate basic routing and layouts
- Configure Tailwind CSS

### Week 2: Core Features
- Migrate main pages and components
- Update data fetching patterns
- Implement server actions

### Week 3: Polish & Testing
- Complete component migration
- Performance optimization
- Comprehensive testing

### Week 4: Deployment
- Production deployment
- Monitoring and optimization
- Documentation updates

## Risk Mitigation

### Potential Issues
1. **Client-side dependencies**: Some packages may not work with server components
2. **Browser APIs**: Need to mark components using window/document as client components
3. **Performance**: Server components might increase initial load
4. **SEO**: Ensure proper meta tags and structured data

### Solutions
1. **Gradual migration**: Migrate components incrementally
2. **Client component boundaries**: Use 'use client' strategically
3. **Performance monitoring**: Use Next.js analytics
4. **SEO testing**: Use Lighthouse and Search Console

## Next Steps
1. Create Next.js project structure
2. Begin with layout and routing migration
3. Migrate one route at a time
4. Test each migration step
5. Deploy incrementally

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Learn Course](https://nextjs.org/learn)
