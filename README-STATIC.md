# Madrid Soft Play - Sitio Web Estático

Este es un sitio web estático HTML, CSS y JavaScript para Madrid Soft Play, convertido desde Next.js.

## Estructura del Proyecto

```
soft-play-madrid/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Funcionalidad JavaScript
├── api/
│   └── brevo.js        # Función serverless para formulario (Brevo)
├── vercel.json         # Configuración de Vercel
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

El formulario de contacto está configurado para usar **Brevo** a través de **Vercel Serverless Functions**.

### Configuración en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com/)
2. **Settings** > **Environment Variables**
3. Añade estas variables:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo
4. Haz un nuevo deploy después de configurar las variables

Para más detalles, consulta **`CONFIGURACION-BREVO.md`**

## Despliegue

### GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. Tu sitio estará disponible en `https://tu-usuario.github.io/tu-repositorio`

### Vercel (Recomendado)

**Opción A: Conectar con GitHub**
1. Sube el código a GitHub
2. Ve a [Vercel](https://vercel.com/) e inicia sesión
3. Haz clic en **Add New Project**
4. Importa tu repositorio de GitHub
5. Configura las variables de entorno (ver sección de formulario)
6. Haz clic en **Deploy**

**Opción B: Vercel CLI**
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta `vercel` en la carpeta del proyecto
3. Sigue las instrucciones
4. Configura las variables de entorno en el dashboard de Vercel

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
- El formulario necesita configuración de variables de entorno en Vercel
- La función serverless (`api/brevo.js`) se despliega automáticamente en Vercel
- Compatible con todos los navegadores modernos

## Soporte

Para problemas o preguntas, revisa:
- La configuración del formulario
- Las rutas de las imágenes
- La consola del navegador para errores JavaScript

