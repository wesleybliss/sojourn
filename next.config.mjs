import 'dotenv/config'

import aliases from './config/aliases.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
        
        for (const [aliasKey, aliasPath] of Object.entries(aliases)) {
            config.resolve.alias[aliasKey] = path.resolve(__dirname, aliasPath)
        }
        
        return config
        
    },
    // Shuffle env vars via NEXT_PUBLIC_* prefix in .env
    // env: {
    //   MY_VAR: process.env.MY_VAR,
    // },
}

export default nextConfig
