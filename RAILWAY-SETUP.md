# Setup Railway para Endpoint Brevo

## Opción Rápida: Usar Railway (Recomendado)

Railway es gratuito y muy fácil de configurar.

### Paso 1: Crear cuenta en Railway
1. Ve a https://railway.app/
2. Inicia sesión con GitHub
3. Haz clic en "New Project"

### Paso 2: Crear nuevo servicio
1. Selecciona "Deploy from GitHub repo"
2. Conecta tu repositorio `maya-dolensky/Madrid-soft-play`
3. Railway detectará automáticamente el proyecto

### Paso 3: Configurar
1. En Railway, ve a tu servicio
2. Ve a "Variables" y añade:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo
   - `PORT` = 3000 (opcional, Railway lo detecta automáticamente)

### Paso 4: Configurar el servicio
1. En Railway, ve a "Settings"
2. En "Root Directory", deja vacío o pon `/`
3. En "Start Command", pon: `node railway-endpoint.js`
4. Railway detectará automáticamente `railway-package.json`

### Paso 5: Obtener URL
1. Railway te dará una URL tipo: `tu-proyecto.up.railway.app`
2. Copia esa URL

### Paso 6: Actualizar script.js
Actualiza la URL en `script.js` línea 112:
```javascript
const response = await fetch('https://tu-proyecto.up.railway.app/brevo', {
```

## Alternativa: Render.com

Si prefieres Render:
1. Ve a https://render.com/
2. Crea un nuevo "Web Service"
3. Conecta tu repositorio
4. Configura igual que Railway
5. Render te dará una URL tipo: `tu-proyecto.onrender.com`

