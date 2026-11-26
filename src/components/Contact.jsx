import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const FORMSPREE_ID = 'YOUR_FORM_ID'
const FORM_READY = FORMSPREE_ID !== 'YOUR_FORM_ID'

const LINKS = [
  { label: 'Email',    val: 'tu@email.com',              href: 'mailto:tu@email.com',               icon: <MailIcon size={18} /> },
  { label: 'GitHub',   val: 'github.com/SaidSar',        href: 'https://github.com/SaidSar',        icon: <GitHubIcon size={18} /> },
  { label: 'LinkedIn', val: 'linkedin.com/in/tu-perfil', href: 'https://linkedin.com/in/tu-perfil', icon: <LinkedInIcon size={18} /> },
]

const EMPTY_FORM = { name:'', email:'', msg:'' }

function ContactLink({ item }) {
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link">
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
          title="Hablemos de"
          highlight="tu proyecto"
          desc="¿Tienes una idea o quieres colaborar? Escríbeme — respondo en menos de 24 horas."
        />

        <div ref={ref} className="contact-grid">
          <div className={`reveal${visible ? ' in' : ''}`} style={{ display:'flex', flexDirection:'column', gap:'2rem', transitionDelay:'200ms' }}>
            {LINKS.map(l => <ContactLink key={l.label} item={l} />)}
            <div style={{ marginTop:'.5rem', padding:'1.1rem 1.4rem', border:'1px solid rgba(34,211,238,.2)', borderRadius:12, background:'rgba(34,211,238,.04)', display:'flex', alignItems:'center', gap:'1rem' }}>
              <span className="anim-pulse" style={{ width:12, height:12, borderRadius:'50%', background:'#22d3ee', flexShrink:0, display:'inline-block' }} />
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#22d3ee' }}>Disponible para proyectos</div>
                <div style={{ fontSize:'.7rem', color:'#475569', marginTop:'.1rem' }}>Freelance · Prácticas profesionales · Colaboraciones</div>
              </div>
            </div>
          </div>

          <div className={`reveal${visible ? ' in' : ''}`} style={{ transitionDelay:'300ms' }}>
            {sent ? (
              <div style={{ background:'#13131a', border:'1px solid rgba(139,92,246,.3)', borderRadius:14, padding:'3rem 2rem', textAlign:'center', boxShadow:'0 0 30px rgba(139,92,246,.15)' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>✦</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'1.25rem', color:'#fff' }}>¡Mensaje enviado!</div>
                <div style={{ color:'#94a3b8', fontSize:'.85rem', marginTop:'.4rem' }}>Te respondo en menos de 24 horas. Gracias por escribir.</div>
                <button onClick={() => setSent(false)} style={{ marginTop:'1.5rem', background:'none', border:'none', cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:'#8b5cf6', textDecoration:'underline', textUnderlineOffset:4 }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <div className="form-row">
                  <div className="field">
                    <label className="field-label">Nombre</label>
                    <input className="ff" type="text" placeholder="Tu nombre" value={form.name} onChange={update('name')} required />
                  </div>
                  <div className="field">
                    <label className="field-label">Email</label>
                    <input className="ff" type="email" placeholder="tu@email.com" value={form.email} onChange={update('email')} required />
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">Mensaje</label>
                  <textarea className="ff" rows={5} placeholder="Cuéntame sobre tu proyecto o idea..." value={form.msg} onChange={update('msg')} required style={{ resize:'none' }} />
                </div>
                {!FORM_READY && (
                  <p className="form-notice">
                    El formulario todavía no está configurado. Mientras tanto, escríbeme directo por email o LinkedIn.
                  </p>
                )}
                {error && (
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:'#f87171', margin:0 }}>{error}</p>
                )}
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
