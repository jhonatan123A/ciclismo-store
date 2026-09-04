#!/bin/bash
echo "🚀 Render Build Script for Ciclismo API"
echo "📁 Current directory: $(pwd)"

# Instalar dependencias
echo "📦 Installing dependencies..."
npm install

# Instalar tipos de Node.js explícitamente
echo "📦 Installing @types/node..."
npm install @types/node@20.10.0 --save-dev

# Generar Prisma Client
echo "🗄️ Generating Prisma Client..."
npm run db:generate

# Construir el proyecto
echo "🏗️ Building project..."
npm run build

echo "✅ Build complete!"