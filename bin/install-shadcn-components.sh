#!/usr/bin/env bash

COMPONENTS=(
    "accordion"
    "alert-dialog"
    "alert"
    "aspect-ratio"
    "avatar"
    "badge"
    "breadcrumb"
    "button"
    "calendar"
    "card"
    "carousel"
    "chart"
    "checkbox"
    "collapsible"
    "command"
    "context-menu"
    "dialog"
    "drawer"
    "dropdown-menu"
    "form"
    "hover-card"
    "input-otp"
    "input"
    "label"
    "menubar"
    "navigation-menu"
    "pagination"
    "popover"
    "progress"
    "radio-group"
    "resizable"
    "scroll-area"
    "select"
    "separator"
    "sheet"
    "sidebar"
    "skeleton"
    "slider"
    "sonner"
    "switch"
    "table"
    "tabs"
    "textarea"
    "toggle-group"
    "toggle"
    "tooltip"
)

BATCH_SIZE=5

# Arrays to track failures
FAILED_BATCHES=()
FAILED_INDIVIDUAL=()

for ((i=0; i<${#COMPONENTS[@]}; i+=BATCH_SIZE)); do

    batch=("${COMPONENTS[@]:i:BATCH_SIZE}")

    echo "Installing batch: ${batch[*]}"

    if pnpm dlx shadcn@latest add "${batch[@]}" -y --overwrite; then

        echo "✅ Batch succeeded: ${batch[*]}"

    else

        echo "⚠️ Batch failed: ${batch[*]}"
        FAILED_BATCHES+=("${batch[*]}")

        echo "Installing individually..."
        for component in "${batch[@]}"; do

            if pnpm dlx shadcn@latest add "$component" -y --overwrite; then
                echo "✅ Installed: $component"
            else
                echo "❌ Failed: $component"
                FAILED_INDIVIDUAL+=("$component")
            fi

        done

    fi

    echo ""
    
done

# Print summary
echo "========================================="
echo "INSTALLATION SUMMARY"
echo "========================================="

if [ ${#FAILED_BATCHES[@]} -eq 0 ] && [ ${#FAILED_INDIVIDUAL[@]} -eq 0 ]; then

    echo "🎉 All components installed successfully!"

else

    if [ ${#FAILED_BATCHES[@]} -gt 0 ]; then
        echo ""
        echo "⚠️ Failed batches (${#FAILED_BATCHES[@]}):"
        for batch in "${FAILED_BATCHES[@]}"; do
            echo "  - $batch"
        done
    fi

    if [ ${#FAILED_INDIVIDUAL[@]} -gt 0 ]; then
        echo ""
        echo "❌ Failed components (${#FAILED_INDIVIDUAL[@]}):"
        printf "  - %s\n" "${FAILED_INDIVIDUAL[@]}"
    fi

    echo ""
    echo "Total failures: ${#FAILED_INDIVIDUAL[@]} components"

fi

echo "========================================="

# Optional: Exit with error code if any failures
if [ ${#FAILED_INDIVIDUAL[@]} -gt 0 ]; then
    exit 1
fi
