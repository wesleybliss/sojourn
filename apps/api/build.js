import { mkdir, readdir, readFile, rm, stat } from 'node:fs/promises'
import { isBuiltin } from 'node:module'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import * as esbuild from 'esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..', '..')
const apiRoot = __dirname
const sharedRoot = join(projectRoot, 'packages', 'shared')
const apiSourceDir = join(__dirname, 'api')
const outputDir = join(projectRoot, 'api')

// Read package.json to get dependencies
async function getPackageDependencies(relativePath) {
    
    try {
        
        const packageJsonPath = join(relativePath, 'package.json')
        const packageData = await readFile(packageJsonPath, 'utf-8')
        const packageJson = JSON.parse(packageData.toString())
        
        // Only bundle production dependencies, not devDependencies
        const deps = packageJson.dependencies || {}
        
        // Return just the package names (keys)
        return Object.keys(deps)
        
    } catch (e) {
        
        console.warn('Could not read package.json, bundling all dependencies:', e)
        return []
        
    }
    
}

async function getEntryPoints(dir) {
    
    try {
        
        const entries = await readdir(dir, { recursive: true, withFileTypes: true })
        
        return entries
            .filter(entry => entry.isFile() && entry.name.endsWith('.ts'))
            .map(entry => {
                const fullPath = join(entry.parentPath, entry.name)
                return relative(dir, fullPath)
            })
        
    } catch (e) {
        
        console.error('Failed to get entry points:', e)
        return []
        
    }
    
}

async function tryResolve(path) {
    
    // Try exact file with .ts extension
    try {
        await stat(path + '.ts')
        return path + '.ts'
    } catch {
        // File not found, try next option
    }
    
    // Try as directory with index.ts
    try {
        await stat(join(path, 'index.ts'))
        return join(path, 'index.ts')
    } catch {
        // Directory not found, return as-is
    }
    
    // Return as-is and let esbuild handle it
    return path
    
}

function pluginPathAliases() {
    
    const setup = build => {
        
        // Handle @/ alias (apps/api/src/*) - bundle these
        build.onResolve({ filter: /^@\/.*/ }, async args => {
            const rest = args.path.slice(2) // Remove '@/'
            const fullPath = join(__dirname, 'src', rest)
            const resolved = await tryResolve(fullPath)
            return { path: resolved, external: false }
        })

        // Handle #handlers/ alias (apps/api/src/handlers/*) - bundle these
        build.onResolve({ filter: /^#handlers\/.*/ }, async args => {
            const rest = args.path.slice('#handlers/'.length)
            const fullPath = join(__dirname, 'src', 'handlers', rest)
            const resolved = await tryResolve(fullPath)
            return { path: resolved, external: false }
        })
        
        // Handle @api/ alias (apps/api/api/*) - bundle these
        build.onResolve({ filter: /^@api\/.*/ }, async args => {
            const rest = args.path.slice(5) // Remove '@api/'
            const fullPath = join(__dirname, 'api', rest)
            const resolved = await tryResolve(fullPath)
            return { path: resolved, external: false }
        })

        // Handle #api/ alias (apps/api/api/*) - bundle these
        build.onResolve({ filter: /^#api\/.*/ }, async args => {
            const rest = args.path.slice('#api/'.length)
            const fullPath = join(__dirname, 'api', rest)
            const resolved = await tryResolve(fullPath)
            return { path: resolved, external: false }
        })
        
        // Bundle @repo/shared - resolve to source for bundling
        build.onResolve({ filter: /^@repo\/shared$/ }, async () => {
            const fullPath = join(projectRoot, 'packages', 'shared', 'src', 'index.ts')
            return { path: fullPath, external: false }
        })
        
        build.onResolve({ filter: /^@repo\/shared\/(.*)/ }, async args => {
            const rest = args.path.slice('@repo/shared/'.length)
            const fullPath = join(projectRoot, 'packages', 'shared', 'src', rest)
            const resolved = await tryResolve(fullPath)
            return { path: resolved, external: false }
        })
        
        // Handle other imports
        build.onResolve({ filter: /^[^./].*/ }, args => {
            
            if (isBuiltin(args.path))
                return { path: args.path, external: true }
            
            // For other packages (node_modules), check if we should externalize them.
            // Major SDKs like firebase-admin are best externalized to avoid bundling issues.
            // Everything else will be bundled.
            const majorDependencies = []
                /*'@vercel/functions',
                '@vercel/queue',
                'groq-sdk',
                'papaparse',
                'google-gax',
                '@google-cloud/firestore',
                '@google-cloud/storage',
                
                'express/lib/router',
                'express/lib/router/layer',
            ]*/
            
            const isMajor = majorDependencies.some(dep =>
                args.path === dep ||
                args.path.startsWith(dep + '/'),
            )
            
            if (isMajor) {
                console.log(`  Marking external: ${args.path}`)
                return { path: args.path, external: true }
            }
            
            // Let esbuild handle everything else (bundle)
            return undefined
            
        })
        
    }
    
    return {
        name: 'path-aliases',
        setup,
    }
    
}

async function build() {
    
    await rm(outputDir, { recursive: true, force: true })
    await mkdir(outputDir, { recursive: true })
    
    const allDependencies = await Promise.all([
        getPackageDependencies(sharedRoot),
        getPackageDependencies(apiRoot),
    ])
    
    const dependencies = allDependencies.flat()
    console.log('Found dependencies to bundle:', dependencies)
    
    const entryPoints = await getEntryPoints(apiSourceDir)
    
    for (const entry of entryPoints) {
        
        const entryPath = join(apiSourceDir, entry)
        const outFile = join(outputDir, entry.replace('.ts', '.js'))
        
        await mkdir(dirname(outFile), { recursive: true })
        
        console.log(`Building ${entry} -> ${relative(projectRoot, outFile)}`)
        
        await esbuild.build({
            entryPoints: [entryPath],
            outfile: outFile,
            bundle: true,
            platform: 'node',
            target: 'node22',
            format: 'esm',
            banner: {
                js: 'import { createRequire } from \'module\'; const require = createRequire(import.meta.url);',
            },
            sourcemap: false,
            plugins: [pluginPathAliases()],
            resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            mainFields: ['module', 'main'],
            conditions: ['import', 'module', 'require', 'default'],
            packages: 'bundle',
        })
        
    }
    
    console.log('Build complete!')
    
}

build().catch(err => {
    console.error('Build failed:', err)
    process.exit(1)
})
