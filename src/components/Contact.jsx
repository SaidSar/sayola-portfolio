import { useEffect, useRef, useState } from 'react'

// ── 1. Ve a formspree.io → New Form → copia tu ID aquí ──
const FORMSPREE_ID = 'YOUR_FORM_ID'

// ── 2. Pon tus datos reales aquí ────────────────────────
const LINKS = [
  {
    label: 'Email',
    val: 'tu@email.com',             // ← tu correo
    href: 'mailto:tu@email.com',     // ← tu correo
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
  },
  {
    label: 'GitHub',
    val: 'github.com/SaidSar',
    href: 'https://github.com/SaidSar',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
    ),
  },
  {
    label: 'LinkedIn',
    val: 'linkedin.com/in/tu-perfil',          // ← tu LinkedIn
    href: 'https://linkedin.com/in/tu-perfil', // ← tu LinkedIn
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
]

function ContactLink({ item }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:'1.25rem', textDecoration:'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ width:44, height:44, border:`1px solid ${hov ? '#8b5cf6' : '#1e1e2a'}`, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color: hov ? '#8b5cf6' : '#64748b', transition:'all .3s', flexShrink:0, boxShadow: hov ? '0 0 12px rgba(139,92,246,.3)' : 'none' }}>
        {item.icon}
      </div>
      <div>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', textTransform:'uppercase', letterSpacing:'.15em' }}>{item.label}</div>
        <div style={{ fontSize:'.9rem', color: hov ? '#a78bfa' : '#cbd5e1', marginTop:'.1rem', transition:'color .3s' }}>{item.val}</div>
      </div>
    </a>
  )
}

export default function Contact() {
  const hdrRef = useRef(null)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', msg:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)   // ← nuevo

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (hdrRef.current) obs.observe(hdrRef.current)
    return () => obs.disconnect()
  }, [])

  // ── Submit real con Formspree ──────────────────────────
  const submit = async (e) => {
    e.preventDefault()
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
        setForm({ name:'', email:'', msg:'' })
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
    <section id="contacto" style={{ padding:'7rem 0', position:'relative', background:'radial-gradient(ellipse at 60% 30%,rgba(139,92,246,.08) 0%,transparent 60%)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem' }}>
        {/* header */}
        <div ref={hdrRef} style={{ marginBottom:'4rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition:'all .65s ease' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
            <div style={{ height:1, width:32, background:'linear-gradient(90deg,#8b5cf6,transparent)' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase' }}> / Contacto</span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'3.5rem', lineHeight:1.05, color:'#fff' }}>
            Hablemos de<br />
            <span className="grad-text">tu proyecto</span>
          </h2>
          <p style={{ marginTop:'.75rem', color:'#64748b', fontWeight:300, maxWidth:400, fontSize:'.95rem', lineHeight:1.7 }}>
            ¿Tienes una idea o quieres colaborar? Escríbeme — respondo en menos de 24 horas.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'5rem', alignItems:'start' }}>
          {/* left */}
          <div style={{ display:'flex', flexDirection:'column', gap:'2rem', opacity: vis ? 1 : 0, transition:'all .65s ease .2s' }}>
            {LINKS.map(l => <ContactLink key={l.label} item={l} />)}
            <div style={{ marginTop:'.5rem', padding:'1.1rem 1.4rem', border:'1px solid rgba(34,211,238,.2)', borderRadius:12, background:'rgba(34,211,238,.04)', display:'flex', alignItems:'center', gap:'1rem' }}>
              <span className="anim-pulse" style={{ width:12, height:12, borderRadius:'50%', background:'#22d3ee', flexShrink:0, display:'inline-block' }} />
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#22d3ee' }}>Disponible para proyectos</div>
                <div style={{ fontSize:'.7rem', color:'#475569', marginTop:'.1rem' }}>Freelance · Prácticas profesionales · Colaboraciones</div>
              </div>
            </div>
          </div>

          {/* right */}
          <div style={{ opacity: vis ? 1 : 0, transition:'all .65s ease .3s' }}>
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
              <form onSubmit={submit} style={{ background:'#13131a', border:'1px solid #1e1e2a', borderRadius:14, padding:'2rem', display:'flex', flexDirection:'column', gap:'1.4rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
                    <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', textTransform:'uppercase', letterSpacing:'.15em' }}>Nombre</label>
                    <input className="ff" type="text" placeholder="Tu nombre" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
                    <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', textTransform:'uppercase', letterSpacing:'.15em' }}>Email</label>
                    <input className="ff" type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
                  <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', textTransform:'uppercase', letterSpacing:'.15em' }}>Mensaje</label>
                  <textarea className="ff" rows={5} placeholder="Cuéntame sobre tu proyecto o idea..." value={form.msg} onChange={e => setForm({...form, msg:e.target.value})} required style={{ resize:'none' }} />
                </div>
                {/* error message */}
                {error && (
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:'#f87171', margin:0 }}>{error}</p>
                )}
                <button type="submit" disabled={loading} className="btn-p" style={{ width:'100%', opacity: loading ? .7 : 1 }}>
                  {loading ? (
                    <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem' }}>
                      <svg className="anim-spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity=".75"/></svg>
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