import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [
        tsconfigPaths(),
    ],
    envDir: '../../',
    test: {
        environment: 'node',
        globals: true,
        setupFiles: ['./test/vitest.setup.ts'],
    },
})
