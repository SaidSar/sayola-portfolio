# Sayola · Developer Portfolio

Portafolio profesional con estilo **Minimalista + Gamer + Épico**, construido con React + Vite + Tailwind CSS.

---

## 🚀 Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (config personalizado con colores neón, animaciones, efectos glow)
- Fuentes: **Syne** (display) · **DM Sans** (body) · **JetBrains Mono** (código)

---

## 📦 Instalación

```bash
# 1. Entra a la carpeta del proyecto
cd sayola-portfolio

# 2. Instala dependencias
npm install

# 3. Corre el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🏗️ Build para producción

```bash
npm run build
npm run preview
```

---

## 📁 Estructura

```
sayola-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navbar fijo con blur y links activos
│   │   ├── Hero.jsx        # Hero animado con typewriter y avatar
│   │   ├── Projects.jsx    # Cards de proyectos con hover glow
│   │   ├── Skills.jsx      # Barras de habilidades animadas
│   │   ├── Contact.jsx     # Formulario de contacto + links sociales
│   │   └── Footer.jsx      # Footer minimalista
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           # Estilos globales + utilidades glow
├── index.html
├── tailwind.config.js      # Paleta personalizada + animaciones
├── vite.config.js
└── postcss.config.js
```

---

## 🎨 Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `void` | `#070709` | Fondo principal |
| `surface` | `#0e0e12` | Fondo de sección |
| `panel` | `#13131a` | Cards y paneles |
| `violet` | `#8b5cf6` | Acento principal |
| `cyan` | `#22d3ee` | Acento secundario |

---

## 🖼️ Agrega tu foto

En `src/components/Hero.jsx`, reemplaza el bloque del avatar placeholder con:

```jsx
<img
  src="/tu-foto.jpg"
  alt="Sayola"
  className="w-full h-full object-cover object-top"
/>
```

Y coloca tu foto en la carpeta `public/`.

---

## ✨ Funciones principales

- **Navbar** fijo con `backdrop-blur`, links activos y menú mobile
- **Hero** con efecto typewriter para roles, animaciones `fade-up`, brackets decorativos y orbs de luz ambiente
- **Projects** con cards de hover glow, badges de estado y links a GitHub/Demo
- **Skills** con barras de progreso animadas al hacer scroll + stats
- **Contacto** con formulario funcional (listo para conectar a EmailJS o similar)

---

## 🔌 Conectar el formulario (EmailJS)

```bash
npm install @emailjs/browser
```

En `Contact.jsx`, reemplaza el `setTimeout` del handleSubmit con:

```js
import emailjs from '@emailjs/browser'

emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
  .then(() => setSent(true))
  .finally(() => setLoading(false))
```

---

Desarrollado por **Sayola** · Nexus Code™
