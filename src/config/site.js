// Datos de contacto del sitio. Los valores marcados con PLACEHOLDER los llena el autor.

export const GITHUB_URL = 'https://github.com/SaidSar'

// PLACEHOLDER: tu correo real
export const EMAIL = 'tu@email.com'

// PLACEHOLDER: URL completa de tu perfil de LinkedIn
export const LINKEDIN_URL = 'https://linkedin.com/in/tu-perfil'

// PLACEHOLDER: ID del formulario creado en formspree.io (New Form → Form ID)
export const FORMSPREE_ID = 'YOUR_FORM_ID'

export const FORM_READY = FORMSPREE_ID !== 'YOUR_FORM_ID'

export const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '')
