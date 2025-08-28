# AGENTS.md
Agent guidelines for automated agents in this repo.

## General Rules
- Do not make any Git commits
- Use modern ES7 syntax with no semicolons, brackets, or unnecessary parens or punctuation

## Commands
- Dev: `pnpm dev`; Build: `pnpm build`; Serve: `pnpm serve`
- Lint JS: `pnpm lint:js` & fix: `pnpm lint:js:fix`; Lint CSS: `pnpm lint:css` & fix: `pnpm lint:css:fix`
- Test: `pnpm test` (once configured); single: `pnpm test -- path/to/file`

## Style Guidelines
- Indent 4 spaces; LF endings; max 120 chars; single quotes; no semicolons; arrow parens only when needed
- .jsx for components; JSDoc types in typedefs.js; use aliases (e.g. @/) for imports
- spaces before blocks & after keywords; blank lines between imports, decls & blocks
- React: functional components & hooks; Tailwind classes only; avoid inline z-index
- Naming: PascalCase for components; camelCase for vars/functions

## Cursor/Copilot Rules
- none detected
