#!/bin/bash

# Build script for TypeScript compilation

echo "Building TypeScript files..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the TypeScript files
echo "Compiling TypeScript..."
npm run build

# Copy the compiled files to the dist directory
echo "Copying files to dist directory..."
mkdir -p dist
cp -r src/*.js dist/

echo "Build complete! Files are in the dist directory." 