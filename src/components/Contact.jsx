import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, FORMSPREE_ID, FORM_READY, displayUrl } from '../config/site'

const LINKS = [
  { label: 'Email',    val: EMAIL,                    href: `mailto:${EMAIL}`, icon: <MailIcon size={18} /> },
  { label: 'GitHub',   val: displayUrl(GITHUB_URL),   href: GITHUB_URL,        icon: <GitHubIcon size={18} /> },
  { label: 'LinkedIn', val: displayUrl(LINKEDIN_URL), href: LINKEDIN_URL,      icon: <LinkedInIcon size={18} /> },
]

const EMPTY_FORM = { name:'', email:'', msg:'' }

function ContactLink({ item }) {
  const external = item.href.startsWith('http')
  return (
    <a href={item.href} className="contact-link" {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      <div className="contact-icon">{item.icon}</div>
      <div>
        <div className="field-label">{item.label}</div>
        <div className="contact-val">{item.val}</div>
      </div>
    </a>
  )
}

export default function Contact() {
  const [ref, visible] = useReveal(0.15)
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!FORM_READY) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.msg }),
      })
      if (res.ok) {
        setSent(true)
        setForm(EMPTY_FORM)
      } else {
        setError('Hubo un error. Intenta de nuevo o escríbeme directo al email.')
      }
    } catch {
      setError('Sin conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="section" style={{ background:'radial-gradient(ellipse at 60% 30%,rgba(139,92,246,.08) 0%,transparent 60%)' }}>
      <div className="container-x">
        <SectionHeader
          label="Contacto"
          highlight="Hablemos"
          desc="¿Tienes una idea o quieres colaborar? Escríbeme — te respondo pronto."
        />

        <div ref={ref} className="contact-grid">
          <div className={`reveal${visible ? ' in' : ''}`} style={{ display:'flex', flexDirection:'column', gap:'2rem', transitionDelay:'200ms' }}>
            {LINKS.map(l => <ContactLink key={l.label} item={l} />)}
            <div style={{ marginTop:'.5rem', padding:'1.1rem 1.4rem', border:'1px solid rgba(34,211,238,.2)', borderRadius:12, background:'rgba(34,211,238,.04)', display:'flex', alignItems:'center', gap:'1rem' }}>
              <span className="anim-pulse" aria-hidden="true" style={{ width:12, height:12, borderRadius:'50%', background:'#22d3ee', flexShrink:0, display:'inline-block' }} />
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#22d3ee' }}>Disponible para prácticas profesionales y colaboraciones</div>
              </div>
            </div>
          </div>

          <div className={`reveal${visible ? ' in' : ''}`} style={{ transitionDelay:'300ms' }}>
            {sent ? (
              <div role="status" style={{ background:'#13131a', border:'1px solid rgba(139,92,246,.3)', borderRadius:14, padding:'3rem 2rem', textAlign:'center', boxShadow:'0 0 30px rgba(139,92,246,.15)' }}>
                <div aria-hidden="true" style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>✦</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'1.25rem', color:'#fff' }}>¡Mensaje enviado!</div>
                <div style={{ color:'#94a3b8', fontSize:'.85rem', marginTop:'.4rem' }}>Te respondo pronto. Gracias por escribir.</div>
                <button onClick={() => setSent(false)} style={{ marginTop:'1.5rem', background:'none', border:'none', cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:'#8b5cf6', textDecoration:'underline', textUnderlineOffset:4 }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="contact-name" className="field-label">Nombre</label>
                    <input id="contact-name" name="name" autoComplete="name" className="ff" type="text" placeholder="Tu nombre" value={form.name} onChange={update('name')} required />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email" className="field-label">Email</label>
                    <input id="contact-email" name="email" autoComplete="email" className="ff" type="email" placeholder="tu@email.com" value={form.email} onChange={update('email')} required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="contact-msg" className="field-label">Mensaje</label>
                  <textarea id="contact-msg" name="message" className="ff" rows={5} placeholder="Cuéntame sobre tu proyecto o idea..." value={form.msg} onChange={update('msg')} required style={{ resize:'none' }} />
                </div>
                {!FORM_READY && (
                  <p className="form-notice" role="status">
                    El formulario todavía no está configurado. Mientras tanto, escríbeme directo por email o LinkedIn.
                  </p>
                )}
                {error && <p role="alert" className="form-error">{error}</p>}
                <button type="submit" disabled={loading || !FORM_READY} className="btn-p" style={{ width:'100%' }}>
                  {loading ? (
                    <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem' }}>
                      <svg className="anim-spin" width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity=".75"/></svg>
                      Enviando...
                    </span>
                  ) : 'Enviar mensaje →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
