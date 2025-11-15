# Configuración de Brevo para el Formulario

## ✅ Implementación Completada

La integración con Brevo ha sido implementada usando Netlify Functions. El formulario ahora se conecta de forma segura con la API de Brevo sin exponer tu API key.

## 🔧 Lo que DEBES hacer tú:

### Paso 1: Configurar Variables de Entorno en Netlify

1. **Ve a tu proyecto en Netlify:**
   - Inicia sesión en [Netlify](https://app.netlify.com/)
   - Selecciona tu proyecto (o crea uno nuevo)

2. **Configura las variables de entorno:**
   - Ve a **Site settings** > **Environment variables**
   - Haz clic en **Add a variable**
   
3. **Añade estas dos variables:**
   
   **Variable 1:**
   - Key: `BREVO_API_KEY`
   - Value: `tu-api-key-de-brevo` (la misma que usabas en Next.js)
   - Scope: `All scopes` (o el que prefieras)
   
   **Variable 2:**
   - Key: `BREVO_LIST_ID`
   - Value: `tu-list-id` (el número de tu lista en Brevo)
   - Scope: `All scopes` (o el que prefieras)

4. **Guarda los cambios**

### Paso 2: Desplegar el Proyecto

Si aún no has desplegado:

1. **Opción A: Arrastrar y soltar**
   - Ve a [Netlify Drop](https://app.netlify.com/drop)
   - Arrastra toda la carpeta del proyecto

2. **Opción B: Conectar con GitHub**
   - Sube tu código a GitHub
   - En Netlify, ve a **Add new site** > **Import an existing project**
   - Conecta tu repositorio
   - Configura:
     - Build command: (deja vacío o `echo "No build needed"`)
     - Publish directory: `.` (punto)

3. **Después del despliegue:**
   - Netlify detectará automáticamente la carpeta `netlify/functions/`
   - Las funciones serverless se desplegarán automáticamente

### Paso 3: Verificar que Funciona

1. Abre tu sitio desplegado en Netlify
2. Completa el formulario de contacto
3. Envía el formulario
4. Verifica en Brevo que el contacto se haya creado/actualizado

## 🔍 Solución de Problemas

### El formulario no envía / Error 500

- **Verifica las variables de entorno:**
  - Ve a Netlify > Site settings > Environment variables
  - Asegúrate de que `BREVO_API_KEY` y `BREVO_LIST_ID` estén configuradas
  - **IMPORTANTE:** Después de añadir variables, necesitas hacer un nuevo deploy

### Error 502 / Error de Brevo

- Verifica que tu API key de Brevo sea correcta
- Verifica que el `BREVO_LIST_ID` sea un número válido
- Revisa los logs de Netlify:
  - Ve a **Functions** en el dashboard de Netlify
  - Haz clic en la función `brevo`
  - Revisa los logs para ver el error específico

### La función no se despliega

- Asegúrate de que el archivo esté en: `netlify/functions/brevo.js`
- Verifica que el archivo tenga la extensión `.js` (no `.ts`)
- Haz un nuevo deploy después de crear el archivo

## 📝 Notas Importantes

- ✅ La API key está segura (no se expone en el frontend)
- ✅ El formulario funciona igual que en Next.js
- ✅ Los datos se envían a la misma lista de Brevo
- ⚠️ **Después de configurar variables de entorno, siempre haz un nuevo deploy**

## 🆘 Si Necesitas Ayuda

1. Revisa los logs de la función en Netlify
2. Verifica que las variables de entorno estén correctamente configuradas
3. Asegúrate de que el `BREVO_LIST_ID` sea un número (no un string)

---

**¡Listo!** Una vez configuradas las variables de entorno y desplegado, el formulario funcionará exactamente igual que antes con Next.js, pero ahora en un sitio estático. 🎉

