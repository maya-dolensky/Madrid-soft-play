# Instrucciones de Uso - Sitio Estático

## ✅ Conversión Completada

Tu proyecto Next.js ha sido convertido exitosamente a un sitio web estático HTML, CSS y JavaScript.

## 📁 Archivos Creados

1. **index.html** - Página principal con todo el contenido
2. **styles.css** - Estilos personalizados
3. **script.js** - Funcionalidad JavaScript (navegación, formulario, acordeón)
4. **api/brevo.js** - Función serverless para formulario (Brevo)
5. **vercel.json** - Configuración de Vercel
6. **README-STATIC.md** - Documentación completa
7. **package-static.json** - Package.json simplificado (opcional)

## 🚀 Cómo Usar

### Opción 1: Servidor Local Simple

Abre `index.html` directamente en tu navegador, o usa un servidor local:

```bash
# Python
python3 -m http.server 8000

# PHP
php -S localhost:8000

# Node.js (si tienes http-server instalado)
npx http-server
```

Luego visita: `http://localhost:8000`

### Opción 2: Despliegue en GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Tu sitio estará en: `https://tu-usuario.github.io/tu-repositorio`

### Opción 3: Despliegue en Vercel (Recomendado)

1. Sube el código a GitHub
2. Ve a [Vercel](https://vercel.com/) e inicia sesión
3. Haz clic en **Add New Project**
4. Importa tu repositorio de GitHub
5. Configura las variables de entorno:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo
6. Haz clic en **Deploy**

**Alternativa con Vercel CLI:**
```bash
npm i -g vercel
vercel
```

### Opción 4: Servidor Web Tradicional

Sube todos los archivos vía FTP/SFTP a tu servidor web.

## ⚙️ Configuración del Formulario

**IMPORTANTE:** El formulario está configurado para usar Brevo a través de Vercel Serverless Functions.

### Configuración en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com/)
2. **Settings** > **Environment Variables**
3. Añade estas variables:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo
4. Haz un nuevo deploy después de configurar las variables

Para más detalles, consulta **`CONFIGURACION-BREVO.md`**

## 🖼️ Imágenes

Las imágenes están configuradas para cargar desde la carpeta `public/`. Si prefieres tenerlas en la raíz:

1. Mueve las imágenes de `public/` a la raíz del proyecto
2. O actualiza las rutas en `index.html` de `public/logo.png` a `logo.png`

## 🎨 Personalización

- **Colores**: Edita las variables CSS en `styles.css` (líneas 4-20)
- **Contenido**: Edita directamente `index.html`
- **Funcionalidad**: Modifica `script.js`

## 📝 Notas Importantes

- ✅ No necesitas Node.js, npm, o ningún framework (solo para desarrollo local)
- ✅ Funciona en cualquier servidor web
- ✅ Compatible con todos los navegadores modernos
- ⚠️ El formulario necesita configuración de variables de entorno en Vercel
- ⚠️ Las imágenes deben estar en `public/` o ajustar las rutas

## 🔍 Verificación

Antes de desplegar, verifica:

1. ✅ Todas las imágenes cargan correctamente
2. ✅ Las variables de entorno están configuradas en Vercel
3. ✅ Los enlaces de navegación funcionan
4. ✅ El menú móvil funciona
5. ✅ El acordeón de FAQ funciona
6. ✅ La función `/api/brevo` está desplegada correctamente

## 📞 Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12) para errores
2. Verifica las rutas de las imágenes
3. Asegúrate de que el formulario esté configurado
4. Consulta `README-STATIC.md` para más detalles

---

¡Tu sitio estático está listo para desplegar! 🎉

