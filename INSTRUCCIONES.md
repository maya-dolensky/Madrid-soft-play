# Instrucciones de Uso - Sitio Estático

## ✅ Conversión Completada

Tu proyecto Next.js ha sido convertido exitosamente a un sitio web estático HTML, CSS y JavaScript.

## 📁 Archivos Creados

1. **index.html** - Página principal con todo el contenido
2. **styles.css** - Estilos personalizados
3. **script.js** - Funcionalidad JavaScript (navegación, formulario, acordeón)
4. **README-STATIC.md** - Documentación completa
5. **package-static.json** - Package.json simplificado (opcional)
6. **.htaccess** - Configuración para Apache (opcional)
7. **netlify.toml** - Configuración para Netlify (opcional)

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

### Opción 3: Despliegue en Netlify

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub

### Opción 4: Servidor Web Tradicional

Sube todos los archivos vía FTP/SFTP a tu servidor web.

## ⚙️ Configuración del Formulario

**IMPORTANTE:** El formulario necesita configuración para funcionar.

### Opción Recomendada: Formspree (Gratis)

1. Ve a https://formspree.io/ y crea una cuenta
2. Crea un nuevo formulario
3. Copia tu ID (ejemplo: `xrgkqyzw`)
4. Abre `script.js` y reemplaza `YOUR_FORMSPREE_ID` con tu ID:

```javascript
const formspreeId = 'xrgkqyzw'; // Tu ID aquí
```

### Opción Alternativa: Mailto

Si no configuras Formspree, el formulario usará `mailto:` automáticamente. Puedes cambiar el email en `script.js` línea 141:

```javascript
window.location.href = `mailto:tu-email@ejemplo.com?subject=${subject}&body=${body}`;
```

## 🖼️ Imágenes

Las imágenes están configuradas para cargar desde la carpeta `public/`. Si prefieres tenerlas en la raíz:

1. Mueve las imágenes de `public/` a la raíz del proyecto
2. O actualiza las rutas en `index.html` de `public/logo.png` a `logo.png`

## 🎨 Personalización

- **Colores**: Edita las variables CSS en `styles.css` (líneas 4-20)
- **Contenido**: Edita directamente `index.html`
- **Funcionalidad**: Modifica `script.js`

## 📝 Notas Importantes

- ✅ No necesitas Node.js, npm, o ningún framework
- ✅ Funciona en cualquier servidor web
- ✅ Compatible con todos los navegadores modernos
- ⚠️ El formulario necesita configuración (Formspree o mailto)
- ⚠️ Las imágenes deben estar en `public/` o ajustar las rutas

## 🔍 Verificación

Antes de desplegar, verifica:

1. ✅ Todas las imágenes cargan correctamente
2. ✅ El formulario está configurado (Formspree o mailto)
3. ✅ Los enlaces de navegación funcionan
4. ✅ El menú móvil funciona
5. ✅ El acordeón de FAQ funciona

## 📞 Soporte

Si tienes problemas:

1. Revisa la consola del navegador (F12) para errores
2. Verifica las rutas de las imágenes
3. Asegúrate de que el formulario esté configurado
4. Consulta `README-STATIC.md` para más detalles

---

¡Tu sitio estático está listo para desplegar! 🎉

