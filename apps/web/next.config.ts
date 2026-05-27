import { fileURLToPath } from 'node:url'

import * as dotenv from 'dotenv'
import type { NextConfig } from 'next'

dotenv.config({
    path: fileURLToPath(new URL('../../.env', import.meta.url)),
    quiet: true,
})

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@repo/shared'],
    devIndicators: false,
}

export default nextConfig
