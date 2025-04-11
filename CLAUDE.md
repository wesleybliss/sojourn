# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint Commands
- Development: `pnpm dev` (runs Vite with host access)
- Build: `pnpm build` (builds the project)
- Serve: `pnpm serve` (preview the built project)
- Lint JS: `pnpm lint:js` (lint all JS/JSX files)
- Lint JS and fix: `pnpm lint:js:fix` (lint and fix JS/JSX files)
- Lint specific file: `pnpm lint:js:fix:one <filepath>` (lint a specific file)
- Lint CSS: `pnpm lint:css` (lint CSS files)
- Lint CSS and fix: `pnpm lint:css:fix` (lint and fix CSS files)

## Code Style Guidelines
- Indentation: 4 spaces (including empty lines)
- Line endings: Unix style (LF)
- Quotes: Single quotes
- No semicolons
- Arrow function parens: Only when needed
- Max line length: 120 characters
- Component files: Use .jsx extension
- Imports: Use aliases (e.g., @/components) over relative paths
- Spacing: Always use spaces before blocks and after keywords
- React components: Use functional components with hooks
- Type definitions: Use JSDoc for types in typedefs.js
- Tailwind: Use for styling; avoid inline z-index values
- Line spacing: Maintain blank lines between imports, declarations, and blocks
- Naming: PascalCase for components, camelCase for variables/functions