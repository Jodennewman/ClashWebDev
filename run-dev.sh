#!/bin/bash

echo "Starting development server with fixed configuration..."
echo "This script will help prevent Vite from changing your file paths."
echo ""
echo "If you encounter any issues with CSS paths, you can:"
echo "1. Run ./fix-paths.sh to fix the paths in your CSS file"
echo "2. Run ./restore-css.sh to restore your CSS from backup"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the development server
npm run dev 