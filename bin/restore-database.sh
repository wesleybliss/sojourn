#!/usr/bin/env bash

set -euo pipefail

FILENAME="${1:-}"
DATABASE="sojourn"

if [ -z "$FILENAME" ] || [ ! -f "$FILENAME" ]; then
    echo "Invalid backup file: $FILENAME"
    echo "USAGE: $0 <filename>"
    exit 1
fi

echo "Restoring $FILENAME into $DATABASE..."

case "$FILENAME" in

    *.sql)
        echo "Using SQL restore..."
        turso db shell "$DATABASE" < "$FILENAME"
        ;;

    *.sqlite)
        echo "Using SQLite restore..."
        turso db import "$DATABASE" "$FILENAME"
        ;;

    *)
        echo "Unsupported backup format: $FILENAME"
        echo "Supported formats: .sql, .sqlite"
        exit 1
        ;;

esac

echo "Restore complete"
