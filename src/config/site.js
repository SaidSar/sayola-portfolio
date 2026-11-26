// Datos de contacto del sitio. Los valores marcados con PLACEHOLDER los llena el autor.
// Mientras un PLACEHOLDER esté vacío, lo que depende de él no se muestra.

export const GITHUB_URL = 'https://github.com/SaidSar'

// PLACEHOLDER: tu correo real. Vacío → se oculta la fila de Email en Contacto.
export const EMAIL = ''

// PLACEHOLDER: URL completa de tu perfil de LinkedIn.
// Vacío → se ocultan el icono del Hero y la fila de LinkedIn en Contacto.
export const LINKEDIN_URL = ''

// PLACEHOLDER: ID del formulario de formspree.io (New Form → Form ID).
// Vacío → el formulario queda deshabilitado con un aviso.
export const FORMSPREE_ID = ''

// PLACEHOLDER: ruta del CV, por ejemplo '/cv.pdf' (archivo en public/).
// Vacío → no se muestra el botón "Descargar CV".
export const CV_URL = ''

export const FORM_READY = FORMSPREE_ID !== ''

export const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '')
