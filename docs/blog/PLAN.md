# PLAN DEL BLOG — BESTIGE

## 📅 Iniciado: Octubre 2026
## 🎯 Objetivo: Blog de contenido científico + SEO + conversión

---

## 📊 ESTADO DEL PROYECTO

### ✅ Completado:
- Planificación (modelo, estructura, endpoints, wireframes)

### ⏳ En progreso:
- Sesión 1: Modelo Prisma + Migración

### 📋 Pendiente:
- Sesión 2: Backend API
- Sesión 3: Frontend público
- Sesión 4: Panel admin
- Sesión 5: Sistema de conversión
- Sesión 6: Contenido (4 artículos)
- Sesión 7: QA + Lanzamiento

---

## 🎯 DECISIONES FINALES

### Contenido:
- **Formato:** Markdown (híbrido, editor simple en admin)
- **Estilo:** Apple (párrafos cortos, mucho aire, sub-headers frecuentes)
- **Idioma:** Español Colombia
- **Tono:** Científico, premium, sobrio, sin exageraciones

### Artículos iniciales (4):
1. **No toda la tecnología deportiva funciona igual** (artículo principal)
2. **¿Qué es la tecnología somatosensorial?** (fundamento)
3. **Cómo elegir la mejor badana de ciclismo en Colombia** (guía)
4. **Cómo elegir la mejor pantaloneta de running en Colombia** (guía)

### Autor:
- Por defecto: **"Equipo BESTIGE"**
- Sin nombre ni rol individual
- Formato: "Por Equipo BESTIGE · X min de lectura"

### Categorías (enum):
- TECNOLOGIA
- GUIAS
- HISTORIAS
- COMPARATIVAS
- NOTICIAS
- CONSEJOS

### Comentarios:
- Sistema de comentarios al final de cada artículo
- Moderación obligatoria (admin aprueba)
- Opción de respuesta por email
- Reutiliza patrón de reviews existente

### Contador de vistas:
- Se cuenta cada visita única (por IP, 24h)
- Visible/oculto por post (desde admin)
- Toggle global también en admin

### Artículo principal:
- 1 artículo se marca como `isMainArticle: true`
- Se muestra GRANDE al inicio del blog
- Los demás en grid (todos iguales)

---

## 🗂️ ESTRUCTURA DE CARPETAS

### Backend: