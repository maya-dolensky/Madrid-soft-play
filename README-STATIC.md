# Madrid Soft Play - Sitio Web Estático

Este es un sitio web estático HTML, CSS y JavaScript para Madrid Soft Play, convertido desde Next.js.

## Estructura del Proyecto

```
soft-play-madrid/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidad JavaScript
├── public/             # Imágenes y recursos estáticos
│   ├── logo.png
│   ├── rincondeSueños.png
│   ├── aventuraInicial.png
│   ├── plusAdventure.png
│   └── ...
└── README-STATIC.md    # Este archivo
```

## Características

- ✅ Sitio completamente estático (HTML, CSS, JavaScript)
- ✅ Diseño responsive (móvil y desktop)
- ✅ Navegación suave entre secciones
- ✅ Menú móvil funcional
- ✅ Acordeón de preguntas frecuentes
- ✅ Formulario de contacto
- ✅ Sin dependencias de Node.js o frameworks

## Configuración del Formulario de Contacto

El formulario de contacto tiene dos opciones:

### Opción 1: Formspree (Recomendado)

1. Ve a [Formspree.io](https://formspree.io/) y crea una cuenta gratuita
2. Crea un nuevo formulario
3. Copia tu ID de formulario (ejemplo: `xrgkqyzw`)
4. Abre `script.js` y reemplaza `YOUR_FORMSPREE_ID` con tu ID:

```javascript
const formspreeId = 'xrgkqyzw'; // Tu ID aquí
```

### Opción 2: Mailto (Fallback)

Si no configuras Formspree, el formulario usará `mailto:` como fallback. Puedes cambiar el email en `script.js`:

```javascript
window.location.href = `mailto:tu-email@ejemplo.com?subject=${subject}&body=${body}`;
```

### Opción 3: EmailJS

También puedes usar EmailJS. Necesitarás:
1. Crear una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar un servicio de email
3. Obtener tu Service ID, Template ID y Public Key
4. Modificar el código en `script.js` para usar EmailJS

## Despliegue

### GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. Tu sitio estará disponible en `https://tu-usuario.github.io/tu-repositorio`

### Netlify

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub a Netlify
3. El sitio se desplegará automáticamente

### Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta `vercel` en la carpeta del proyecto
3. Sigue las instrucciones

### Servidor Web Tradicional

Simplemente sube todos los archivos a tu servidor web vía FTP/SFTP. Asegúrate de que:
- `index.html` esté en la raíz
- Las rutas de las imágenes en `public/` sean correctas
- El servidor soporte archivos estáticos

## Personalización

### Colores

Los colores están definidos en `styles.css` usando variables CSS. Puedes modificarlos en la sección `:root`:

```css
:root {
  --accent: oklch(0.75 0.08 25); /* Color principal */
  --background: oklch(0.98 0.005 85); /* Fondo */
  /* ... más colores */
}
```

### Contenido

Edita directamente `index.html` para cambiar:
- Textos
- Imágenes (cambia las rutas en los `<img>`)
- Secciones
- Precios y paquetes

### Estilos

Los estilos principales vienen de Tailwind CSS (CDN). Los estilos personalizados están en `styles.css`.

## Notas Importantes

- Las imágenes deben estar en la carpeta `public/` o ajustar las rutas en `index.html`
- El formulario necesita configuración (Formspree, EmailJS o mailto)
- No hay backend - todo es estático
- Compatible con todos los navegadores modernos

## Soporte

Para problemas o preguntas, revisa:
- La configuración del formulario
- Las rutas de las imágenes
- La consola del navegador para errores JavaScript

