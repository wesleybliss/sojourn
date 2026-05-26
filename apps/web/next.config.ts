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
    // Shuffle env vars via NEXT_PUBLIC_* prefix in .env
    // env: {
    //   MY_VAR: process.env.MY_VAR,
    // },
}

export default nextConfig
