import { useEffect, useRef, useState } from 'react'

// ── Cambia los links reales aquí ──────────────────────────
const PROJECTS = [
  {
    id: '01',
    title: 'El Gremio de la Lectura',
    sub: 'Sistema de Gestión de Biblioteca',
    desc: 'Plataforma web full-stack para gestión integral de biblioteca. React/Vite en el frontend, ASP.NET Core en el backend, desplegada en producción.',
    stack: ['React', 'Vite', 'ASP.NET Core', 'SQL Server', 'Vercel'],
    status: 'Live',
    accent: '#8b5cf6',
    github: 'https://github.com/SaidSar/gremio-de-la-lectura',
    demo: 'https://gremio-de-la-lectura.vercel.app',
    repo: 'SaidSar/gremio-de-la-lectura',
  },
  {
    id: '02',
    title: 'SCHIZOPHRENIA',
    sub: 'Videojuego de Horror Mobile',
    desc: 'Juego de terror 3D en primera persona para Android, desarrollado en solitario. Audio reactivo, iluminación dinámica y mecánicas psicológicas inmersivas.',
    stack: ['Godot 4.6', 'GDScript', 'Blender', 'Android'],
    status: 'In Dev',
    accent: '#22d3ee',
    github: 'https://github.com/SaidSar',
    demo: null,
    repo: null,
  },
  {
    id: '03',
    title: 'sayola-days',
    sub: 'Habit Tracker — React Native',
    desc: 'App móvil de seguimiento de hábitos con modo oscuro/claro, auth local con AsyncStorage y reset diario automático.',
    stack: ['React Native', 'Expo SDK 54', 'Expo Router', 'AsyncStorage'],
    status: 'In Dev',
    accent: '#8b5cf6',
    github: 'https://github.com/SaidSar',
    demo: null,
    repo: null,
  },
  {
    id: '04',
    title: 'Luis Coffee Break POS',
    sub: 'Sistema Punto de Venta',
    desc: 'POS completo para cafetería local en Los Mochis. Inventario con IA (Anthropic Vision), reportes Excel, roles de usuario y gestión de mesas en tiempo real.',
    stack: ['React', 'Node.js', 'Prisma', 'Supabase', 'Socket.io'],
    status: 'In Dev',
    accent: '#22d3ee',
    github: 'https://github.com/SaidSar',
    demo: null,
    repo: null,
  },
]

// ── Fetch live stats desde GitHub API ─────────────────────
function useGitHubStats(repo) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    if (!repo) return
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.json())
      .then(d => {
        if (d.stargazers_count !== undefined)
          setStats({
            stars: d.stargazers_count,
            updated: new Date(d.pushed_at).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }),
          })
      })
      .catch(() => {})
  }, [repo])
  return stats
}

function Card({ p, delay }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [hov, setHov] = useState(false)
  const gh = useGitHubStats(p.repo)   // ← nuevo

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const badgeStyle = p.status === 'Live'
    ? { border:'1px solid rgba(34,211,238,.4)', color:'#22d3ee', background:'rgba(34,211,238,.05)' }
    : p.status === 'In Dev'
    ? { border:'1px solid rgba(251,191,36,.4)', color:'#fbbf24', background:'rgba(251,191,36,.05)' }
    : { border:'1px solid #334155', color:'#64748b', background:'rgba(100,116,139,.05)' }

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      <div className="proj-card" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        {/* accent line */}
        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${p.accent},transparent)`, opacity:.7 }} />
        <div style={{ padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.2rem' }}>
          {/* top */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#334155', letterSpacing:'.2em', textTransform:'uppercase' }}>Project {p.id}</div>
              <div className="ctitle" style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'1.1rem', color: hov ? '#a78bfa' : '#fff', marginTop:'.2rem', transition:'color .3s' }}>{p.title}</div>
              <div style={{ fontSize:'.7rem', color:'#475569', marginTop:'.1rem' }}>{p.sub}</div>
            </div>
            <span style={{ ...badgeStyle, flexShrink:0, marginLeft:'.5rem', padding:'.25rem .7rem', borderRadius:999, fontFamily:"'JetBrains Mono',monospace", fontSize:'.58rem', letterSpacing:'.1em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'.35rem' }}>
              {p.status === 'Live' && <span style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', display:'inline-block', animation:'pulseA 2s infinite' }} />}
              {p.status}
            </span>
          </div>
          {/* desc */}
          <p style={{ color:'#94a3b8', fontSize:'.82rem', lineHeight:1.7, fontWeight:300 }}>{p.desc}</p>
          {/* stack */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
            {p.stack.map(t => (
              <span key={t} style={{ padding:'.2rem .65rem', fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color:'#475569', border:'1px solid #1e1e2a', borderRadius:3, background:'rgba(7,7,9,.5)' }}>{t}</span>
            ))}
          </div>
          {/* actions + github stats */}
          <div style={{ display:'flex', alignItems:'center', gap:'.75rem', paddingTop:'.75rem', borderTop:'1px solid #1e1e2a' }}>
            <GHLink href={p.github} />
            {/* stats en vivo si el repo es público */}
            {gh && (
              <div style={{ display:'flex', gap:'.75rem', marginLeft:'auto' }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.58rem', color:'#334155' }}>★ {gh.stars}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.58rem', color:'#334155' }}>↑ {gh.updated}</span>
              </div>
            )}
            {p.demo && <DemoLink href={p.demo} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function GHLink({ href }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:'flex', alignItems:'center', gap:'.4rem', fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color: hov ? '#fff' : '#475569', textDecoration:'none', transition:'color .25s' }}
    >
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub
    </a>
  )
}

function DemoLink({ href }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ marginLeft:'auto', fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color: hov ? '#22d3ee' : '#475569', textDecoration:'none', transition:'color .25s' }}
    >
      Demo →
    </a>
  )
}

export default function Projects() {
  const hdrRef = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.2 })
    if (hdrRef.current) obs.observe(hdrRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="proyectos" style={{ padding:'7rem 0', position:'relative', background:'radial-gradient(ellipse at 30% 50%,rgba(139,92,246,.07) 0%,transparent 60%)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem' }}>
        {/* header */}
        <div ref={hdrRef} style={{ marginBottom:'4rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition:'all .65s ease' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
            <div style={{ height:1, width:32, background:'linear-gradient(90deg,#8b5cf6,transparent)' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase' }}> / Proyectos</span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'3.5rem', lineHeight:1.05, color:'#fff' }}>
            Lo que he<br />
            <span className="grad-text">construido</span>
          </h2>
          <p style={{ marginTop:'.75rem', color:'#64748b', fontWeight:300, maxWidth:400, fontSize:'.95rem', lineHeight:1.7 }}>
            Proyectos reales — académicos, personales y para clientes.
          </p>
        </div>

        {/* grid 2×2 */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.5rem' }}>
          {PROJECTS.map((p, i) => <Card key={p.id} p={p} delay={i * 120} />)}
        </div>

        {/* GitHub CTA */}
        <div style={{ marginTop:'3rem', textAlign:'center' }}>
          <a
            href="https://github.com/SaidSar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'.75rem', padding:'.85rem 2rem', border:'1px solid #1e1e2a', borderRadius:6, background:'#13131a', fontFamily:"'JetBrains Mono',monospace", fontSize:'.68rem', color:'#94a3b8', textDecoration:'none', letterSpacing:'.1em', transition:'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#8b5cf6'; e.currentTarget.style.color='#a78bfa'; e.currentTarget.style.boxShadow='0 0 20px rgba(139,92,246,.25)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#1e1e2a'; e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.boxShadow='none' }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            Ver todos los repositorios en GitHub
          </a>
        </div>
      </div>
    </section>
  )
}