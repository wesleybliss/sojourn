#!/usr/bin/env bash

timestamp() {
    while IFS= read -r line; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $line"
    done
}

{
    echo "=== Cache Cleanup Script Started ==="

    # Node.js module caches
    echo "Cleaning node_modules/.cache directories..."
    rm -rf node_modules/.cache
    rm -rf apps/web/node_modules/.cache
    rm -rf packages/shared/node_modules/.cache

    # TypeScript caches
    echo "Cleaning TypeScript build info files..."
    find . -type f -name "*.tsbuildinfo" -delete 2>/dev/null

    # Build outputs
    echo "Cleaning build artifacts..."
    rm -rf apps/**/dist apps/**/build packages/**/dist packages/**/build 2>/dev/null

    echo "=== Cache Cleanup Completed ==="
} 2>&1 | timestamp
