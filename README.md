# Madrid Soft Play - Sitio Web Estático

Sitio web estático HTML, CSS y JavaScript para Madrid Soft Play - Alquiler de soft play a domicilio en Madrid.

## 📁 Estructura del Proyecto

```
soft-play-madrid/
├── index.html              # Página principal
├── styles.css              # Estilos personalizados
├── script.js               # Funcionalidad JavaScript
├── public/                 # Imágenes y recursos estáticos
├── netlify/
│   └── functions/
│       └── brevo.js        # Función serverless para formulario (Brevo)
├── api/
│   └── brevo.js            # Versión alternativa para Vercel
├── netlify.toml            # Configuración de Netlify
├── .htaccess               # Configuración Apache (opcional)
└── README.md               # Este archivo
```

## 🚀 Características

- ✅ Sitio completamente estático (HTML, CSS, JavaScript)
- ✅ Diseño responsive (móvil y desktop)
- ✅ Navegación suave entre secciones
- ✅ Menú móvil funcional
- ✅ Acordeón de preguntas frecuentes
- ✅ Formulario de contacto integrado con Brevo
- ✅ Sin dependencias de Node.js o frameworks

## 📋 Requisitos Previos

- Cuenta en Netlify (o Vercel)
- Cuenta en Brevo con API key y List ID

## 🔧 Configuración

### 1. Configurar Variables de Entorno en Netlify

1. Ve a tu proyecto en [Netlify](https://app.netlify.com/)
2. **Site settings** > **Environment variables**
3. Añade:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo

### 2. Desplegar

**Opción A: Netlify Drop**
- Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)

**Opción B: GitHub**
- Sube el código a GitHub
- Conecta el repositorio en Netlify
- Configura:
  - Build command: (vacío)
  - Publish directory: `.`

**Opción C: Vercel**
- Si usas Vercel, usa el archivo `api/brevo.js` en lugar de `netlify/functions/brevo.js`
- Actualiza `script.js` para usar `/api/brevo` en lugar de `/.netlify/functions/brevo`

## 📚 Documentación

- **`CONFIGURACION-BREVO.md`** - Guía detallada para configurar Brevo
- **`INSTRUCCIONES.md`** - Instrucciones rápidas de uso
- **`README-STATIC.md`** - Documentación técnica completa

## 🎨 Personalización

- **Colores**: Edita las variables CSS en `styles.css`
- **Contenido**: Edita directamente `index.html`
- **Funcionalidad**: Modifica `script.js`

## 📝 Notas

- El formulario requiere configuración de variables de entorno en Netlify/Vercel
- Las imágenes deben estar en la carpeta `public/`
- Compatible con todos los navegadores modernos

## 📞 Soporte

Para problemas o preguntas, consulta:
- `CONFIGURACION-BREVO.md` para problemas con el formulario
- Los logs de Netlify/Vercel para errores de funciones serverless

---

**Madrid Soft Play** - Plaza blanda a domicilio para bebés y niños pequeños en toda la Comunidad de Madrid.

