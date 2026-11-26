# Sayola · Portafolio

Portafolio personal de desarrollador: estilo minimalista y gamer, fondo oscuro con acentos neón. Sitio en español, de una sola página.

En producción: https://sayola-portfolio.vercel.app

## Stack

- **React 18** + **Vite 5**
- **CSS propio** en `src/index.css` (clases, `@media` y animaciones) más estilos en línea en los componentes
- **Tailwind CSS 3** instalado solo para el reset base y utilidades estándar; no se usan tokens personalizados
- Fuentes de Google Fonts: Syne (títulos), DM Sans (cuerpo) y JetBrains Mono (etiquetas)
- Formulario de contacto con [Formspree](https://formspree.io)
- Estadísticas de repos desde la API pública de GitHub

## Correr en local

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build de producción

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ en local
```

## Configuración

Los datos de contacto viven en `src/config/site.js`. Los valores marcados con `PLACEHOLDER` se llenan a mano; mientras estén vacíos, lo que depende de ellos no se muestra:

| Constante | Uso | Si está vacía |
|---|---|---|
| `EMAIL` | Correo de contacto | Se oculta la fila de Email en Contacto |
| `LINKEDIN_URL` | Perfil de LinkedIn | Se ocultan el icono del Hero y la fila de LinkedIn |
| `FORMSPREE_ID` | ID del formulario de Formspree | El formulario queda deshabilitado con un aviso |
| `CV_URL` | Ruta del CV, p. ej. `/cv.pdf` en `public/` | No se muestra el botón "Descargar CV" |

En `index.html`, `canonical`, `og:url`, `og:image` y `twitter:image` usan el dominio de producción (https://sayola-portfolio.vercel.app). Si cambias de dominio, actualízalos.

Los proyectos se editan en el arreglo `PROJECTS` de `src/components/Projects.jsx`. Si un proyecto tiene `repo` (`usuario/repositorio`), la tarjeta muestra estrellas y fecha de la última actualización.

## Estructura

```
src/
├── components/   Navbar, Hero, Projects, Skills, Contact, Footer, SectionHeader, Icons
├── config/       site.js (datos de contacto)
├── hooks/        useReveal.js (animación al entrar en pantalla)
├── utils/        scroll.js (scroll suave a secciones)
├── App.jsx
├── main.jsx
└── index.css     estilos globales, layout responsive y animaciones
public/           foto de perfil y favicon
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. En Vercel: **Add New → Project** e importa el repositorio.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`.
4. Deploy. Cada push a `main` vuelve a desplegar.

El sitio no necesita variables de entorno.
