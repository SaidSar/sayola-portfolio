# Sayola · Portafolio

Portafolio personal de desarrollador: estilo minimalista y gamer, fondo oscuro con acentos neón. Sitio en español, de una sola página.

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

Los datos de contacto viven en `src/config/site.js`. Los valores marcados con `PLACEHOLDER` se llenan a mano:

| Constante | Uso |
|---|---|
| `EMAIL` | Correo de contacto |
| `LINKEDIN_URL` | Perfil de LinkedIn (Hero y Contacto) |
| `FORMSPREE_ID` | ID del formulario de Formspree; mientras sea `YOUR_FORM_ID` el formulario queda deshabilitado con un aviso |

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
