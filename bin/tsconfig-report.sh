#!/usr/bin/env bash

find . \
    -type f \
    -name 'tsconfig*.json' \
    -not -path '*node_modules*' \
    -print0 | \
while IFS= read -r -d '' file; do
    echo "[$file]:"
    cat "$file"
    echo ""
done
