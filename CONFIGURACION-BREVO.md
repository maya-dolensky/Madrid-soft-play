# Configuración de Brevo para el Formulario

## ✅ Implementación Completada

La integración con Brevo ha sido implementada usando Vercel Serverless Functions. El formulario ahora se conecta de forma segura con la API de Brevo sin exponer tu API key.

## 🔧 Lo que DEBES hacer tú:

### Paso 1: Configurar Variables de Entorno en Vercel

1. **Ve a tu proyecto en Vercel:**
   - Inicia sesión en [Vercel](https://vercel.com/)
   - Selecciona tu proyecto (o crea uno nuevo)

2. **Configura las variables de entorno:**
   - Ve a **Settings** > **Environment Variables**
   - Haz clic en **Add New**
   
3. **Añade estas dos variables:**
   
   **Variable 1:**
   - Key: `BREVO_API_KEY`
   - Value: `tu-api-key-de-brevo` (tu API key de Brevo)
   - Environment: `Production`, `Preview`, `Development` (selecciona todos los que necesites)
   
   **Variable 2:**
   - Key: `BREVO_LIST_ID`
   - Value: `tu-list-id` (el número de tu lista en Brevo)
   - Environment: `Production`, `Preview`, `Development` (selecciona todos los que necesites)

4. **Guarda los cambios**

### Paso 2: Desplegar el Proyecto

Si aún no has desplegado:

1. **Opción A: Conectar con GitHub (Recomendado)**
   - Sube tu código a GitHub
   - En Vercel, ve a **Add New Project**
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un sitio estático
   - Haz clic en **Deploy**

2. **Opción B: Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```
   - Sigue las instrucciones en la terminal
   - Las variables de entorno se pueden configurar durante el deploy o después en el dashboard

3. **Después del despliegue:**
   - Vercel detectará automáticamente la carpeta `api/`
   - Las funciones serverless se desplegarán automáticamente
   - Tu sitio estará disponible en una URL de Vercel

### Paso 3: Verificar que Funciona

1. Abre tu sitio desplegado en Vercel
2. Completa el formulario de contacto
3. Envía el formulario
4. Verifica en Brevo que el contacto se haya creado/actualizado

## 🔍 Solución de Problemas

### El formulario no envía / Error 500

- **Verifica las variables de entorno:**
  - Ve a Vercel > Settings > Environment Variables
  - Asegúrate de que `BREVO_API_KEY` y `BREVO_LIST_ID` estén configuradas
  - **IMPORTANTE:** Después de añadir variables, necesitas hacer un nuevo deploy
  - Verifica que las variables estén en el entorno correcto (Production/Preview/Development)

### Error 502 / Error de Brevo

- Verifica que tu API key de Brevo sea correcta
- Verifica que el `BREVO_LIST_ID` sea un número válido
- Revisa los logs de Vercel:
  - Ve a **Deployments** en el dashboard de Vercel
  - Haz clic en el deployment más reciente
  - Ve a la pestaña **Functions**
  - Haz clic en `/api/brevo`
  - Revisa los logs para ver el error específico

### La función no se despliega

- Asegúrate de que el archivo esté en: `api/brevo.js`
- Verifica que el archivo tenga la extensión `.js` (no `.ts`)
- Verifica que `vercel.json` esté configurado correctamente
- Haz un nuevo deploy después de crear/modificar el archivo

### Error CORS

- La función ya incluye headers CORS configurados
- Si sigues teniendo problemas, verifica que el dominio esté permitido en Vercel

## 📝 Notas Importantes

- ✅ La API key está segura (no se expone en el frontend)
- ✅ El formulario funciona igual que antes con Next.js
- ✅ Los datos se envían a la misma lista de Brevo
- ⚠️ **Después de configurar variables de entorno, siempre haz un nuevo deploy**
- ⚠️ **Asegúrate de configurar las variables en todos los entornos que uses** (Production, Preview, Development)

## 🆘 Si Necesitas Ayuda

1. Revisa los logs de la función en Vercel:
   - Dashboard > Deployments > [Tu deployment] > Functions > `/api/brevo` > Logs
2. Verifica que las variables de entorno estén correctamente configuradas
3. Asegúrate de que el `BREVO_LIST_ID` sea un número (no un string)
4. Verifica que tu API key de Brevo tenga los permisos necesarios

## 🔗 Enlaces Útiles

- [Documentación de Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Documentación de la API de Brevo](https://developers.brevo.com/)
- [Dashboard de Vercel](https://vercel.com/dashboard)

---

**¡Listo!** Una vez configuradas las variables de entorno y desplegado, el formulario funcionará correctamente en Vercel. 🎉
