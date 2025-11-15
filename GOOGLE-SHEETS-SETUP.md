# Setup Google Sheets para Formulario (GRATIS y SIMPLE)

Esta es la solución más simple y completamente gratuita. No requiere backend ni servicios externos.

## Paso 1: Abrir Google Apps Script
1. Ve a https://script.google.com/
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Nuevo proyecto"

## Paso 2: Pegar el código
1. Borra todo el código que viene por defecto
2. Abre el archivo `google-sheets-script.js` de este proyecto
3. Copia TODO el contenido
4. Pégalo en Google Apps Script

## Paso 3: Guardar el proyecto
1. Haz clic en "Guardar" (icono de disquete)
2. Dale un nombre al proyecto: `Madrid Soft Play Form`

## Paso 4: Desplegar como Web App
1. Haz clic en "Desplegar" → "Nueva implementación"
2. Haz clic en el icono de engranaje ⚙️ → "Aplicación web"
3. Configuración:
   - **Descripción**: `Formulario Madrid Soft Play`
   - **Ejecutar como**: `Yo (tu email)`
   - **Quién tiene acceso**: `Cualquiera` (importante para que funcione desde tu sitio web)
4. Haz clic en "Desplegar"
5. **IMPORTANTE**: Autoriza los permisos cuando te lo pida:
   - Haz clic en "Autorizar acceso"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" → "Ir a [nombre del proyecto] (no seguro)"
   - Haz clic en "Permitir"

## Paso 5: Copiar la URL del Web App
1. Después de desplegar, Google te dará una URL tipo:
   `https://script.google.com/macros/s/AKfycby.../exec`
2. **Copia esta URL completa**

## Paso 6: Preparar la hoja de cálculo
1. Ve a tu Google Sheet: https://docs.google.com/spreadsheets/d/1CoICvYaKoWSaNLe4j2p5PwhVRxaaEjwv5P67PNJG3sk/edit
2. En la primera fila, añade estos encabezados (en este orden):
   ```
   Timestamp | Nombre | Email | Fecha Evento | Barrio | Edad | Pack | Mensaje
   ```
3. Guarda la hoja

## Paso 7: Actualizar script.js
1. Abre `script.js` en tu proyecto
2. En la línea 114, reemplaza la URL con la que copiaste de Google Apps Script:
   ```javascript
   const API_URL = window.location.hostname.includes('github.io') 
     ? 'https://script.google.com/macros/s/TU-URL-AQUI/exec' // ← Pega tu URL aquí
     : '/api/brevo';
   ```

## Paso 8: Probar
1. Haz push de los cambios
2. Abre tu sitio web
3. Envía un formulario de prueba
4. Verifica que los datos aparezcan en tu Google Sheet

## Ventajas de esta solución:
- ✅ Completamente GRATIS
- ✅ No requiere backend ni servicios externos
- ✅ Los datos se guardan directamente en Google Sheets
- ✅ Puedes ver los datos en tiempo real
- ✅ Puedes exportar a Excel, CSV, etc.
- ✅ Muy fácil de mantener

## Notas:
- La primera vez que uses el script después de un tiempo, puede tardar unos segundos en "despertar"
- Los datos se añaden como nuevas filas en la hoja
- Puedes formatear la hoja como quieras (colores, filtros, etc.)

