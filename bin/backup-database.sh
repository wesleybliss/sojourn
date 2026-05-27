#!/usr/bin/env bash

TS=$(date '+%Y-%m-%d_%H-%M-%S')
DIR="$PWD/backups"
FILENAME="sojourn-backup_$TS"

mkdir -p "$DIR"

echo "Backing up database"

if [ "$1" == "--raw" ]; then

    echo "Using raw SQL output mode"
    FILENAME="$FILENAME.sql"

    turso db shell sojourn ".dump" > "$DIR/$FILENAME"

else

    echo "Using SQLite output mode"
    FILENAME="$FILENAME.sqlite"

    turso db export sojourn --output-file="$DIR/$FILENAME"

fi

echo "Backed up to $DIR/$FILENAME"
