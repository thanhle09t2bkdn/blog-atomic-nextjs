#!/bin/sh
# This script formats only staged files

# Get list of staged files
staged_files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|jsx|ts|tsx|json|css|scss|md)$')

if [ -n "$staged_files" ]; then
  echo "Formatting staged files..."
  echo "$staged_files" | xargs npx prettier --write
  echo "$staged_files" | xargs git add
  echo "✅ Staged files formatted successfully!"
else
  echo "No staged files to format."
fi
