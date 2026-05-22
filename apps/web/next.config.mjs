import 'dotenv/config'

import aliases from './config/aliases'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resolvedAliases = Object.fromEntries(
    Object.entries(aliases).map(([key, value]) => [
        key,
        path.resolve(__dirname, value),
    ])
)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    turbopack: {
        resolveAlias: resolvedAliases,
    },
    // Shuffle env vars via NEXT_PUBLIC_* prefix in .env
    // env: {
    //   MY_VAR: process.env.MY_VAR,
    // },
}

export default nextConfig
