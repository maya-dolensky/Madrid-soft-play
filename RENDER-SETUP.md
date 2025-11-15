# Setup Render.com para Endpoint Brevo (GRATIS)

Render.com tiene un plan gratuito generoso que es perfecto para esto.

## Paso 1: Crear cuenta en Render
1. Ve a https://render.com/
2. Haz clic en "Get Started for Free"
3. Inicia sesión con GitHub

## Paso 2: Crear nuevo Web Service
1. En el dashboard, haz clic en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub: `maya-dolensky/Madrid-soft-play`

## Paso 3: Configurar el servicio
1. **Name**: `brevo-endpoint` (o el nombre que prefieras)
2. **Region**: Elige el más cercano (ej: Frankfurt, EU)
3. **Branch**: `main`
4. **Root Directory**: Deja vacío
5. **Runtime**: `Node`
6. **Build Command**: `npm install`
7. **Start Command**: `node render-endpoint.js`
8. **Plan**: Selecciona **Free** (gratis)

## Paso 4: Configurar Variables de Entorno
Antes de hacer deploy, en la sección "Environment Variables":
1. Haz clic en "Add Environment Variable"
2. Añade:
   - Key: `BREVO_API_KEY`
   - Value: `tu-api-key-de-brevo`
3. Añade otra:
   - Key: `BREVO_LIST_ID`
   - Value: `tu-list-id`

## Paso 5: Deploy
1. Haz clic en "Create Web Service"
2. Render empezará a construir y desplegar automáticamente
3. Espera 2-3 minutos a que termine

## Paso 6: Obtener URL
1. Una vez desplegado, Render te dará una URL tipo:
   `https://brevo-endpoint.onrender.com`
2. **IMPORTANTE**: En el plan gratuito, el servicio se "duerme" después de 15 minutos de inactividad. La primera petición puede tardar 30-50 segundos en "despertar". Esto es normal.

## Paso 7: Actualizar script.js
Actualiza la línea 114 en `script.js` con tu URL de Render:
```javascript
? 'https://brevo-endpoint.onrender.com/brevo' // ← Tu URL aquí
```

## Notas importantes:
- ✅ Completamente GRATIS
- ⚠️ Primera petición después de inactividad puede tardar 30-50 segundos (solo la primera)
- ✅ Funciona perfectamente para formularios

