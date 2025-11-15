# Madrid Soft Play - Sitio Web Estático

Sitio web estático HTML, CSS y JavaScript para Madrid Soft Play - Alquiler de soft play a domicilio en Madrid.

## 📁 Estructura del Proyecto

```
soft-play-madrid/
├── index.html              # Página principal
├── styles.css              # Estilos personalizados
├── script.js               # Funcionalidad JavaScript
├── public/                 # Imágenes y recursos estáticos
├── api/
│   └── brevo.js            # Función serverless para formulario (Brevo)
├── vercel.json             # Configuración de Vercel
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

- Cuenta en Vercel
- Cuenta en Brevo con API key y List ID

## 🔧 Configuración

### 1. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com/)
2. **Settings** > **Environment Variables**
3. Añade:
   - `BREVO_API_KEY` = tu API key de Brevo
   - `BREVO_LIST_ID` = tu List ID de Brevo

### 2. Desplegar

**Opción A: Conectar con GitHub (Recomendado)**
- Sube el código a GitHub
- En Vercel, ve a **Add New Project**
- Importa tu repositorio de GitHub
- Vercel detectará automáticamente que es un sitio estático
- Haz clic en **Deploy**

**Opción B: Vercel CLI**
```bash
npm i -g vercel
vercel
```

## 📚 Documentación

- **`CONFIGURACION-BREVO.md`** - Guía detallada para configurar Brevo en Vercel
- **`INSTRUCCIONES.md`** - Instrucciones rápidas de uso
- **`README-STATIC.md`** - Documentación técnica completa

## 🎨 Personalización

- **Colores**: Edita las variables CSS en `styles.css`
- **Contenido**: Edita directamente `index.html`
- **Funcionalidad**: Modifica `script.js`

## 📝 Notas

- El formulario requiere configuración de variables de entorno en Vercel
- Las imágenes deben estar en la carpeta `public/`
- Compatible con todos los navegadores modernos

## 📞 Soporte

Para problemas o preguntas, consulta:
- `CONFIGURACION-BREVO.md` para problemas con el formulario
- Los logs de Vercel para errores de funciones serverless

---

**Madrid Soft Play** - Plaza blanda a domicilio para bebés y niños pequeños en toda la Comunidad de Madrid.
