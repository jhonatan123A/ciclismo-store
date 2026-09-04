#!/bin/bash
echo "🚀 Starting Ciclismo Store API..."
echo "📁 Current directory: $(pwd)"
echo "📁 Files in dist:"
ls -la dist/ 2>/dev/null || echo "dist directory not found"

# Ejecutar el servidor
node dist/main.js