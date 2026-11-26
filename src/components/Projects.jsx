import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import { GitHubIcon } from './Icons'
import { GITHUB_URL } from '../config/site'

const PROJECTS = [
  {
    id: '01',
    title: 'El Gremio de la Lectura',
    sub: 'Sistema de Gestión de Biblioteca',
    desc: 'Plataforma web full-stack para gestión integral de biblioteca. React/Vite en el frontend, ASP.NET Core en el backend, desplegada en producción.',
    stack: ['React', 'Vite', 'ASP.NET Core', 'SQL Server', 'Vercel'],
    status: 'live',
    accent: '#8b5cf6',
    github: 'https://github.com/SaidSar/gremio-de-la-lectura',
    demo: 'https://gremio-de-la-lectura.vercel.app',
    repo: 'SaidSar/gremio-de-la-lectura',
  },
  {
    id: '02',
    title: 'SCHIZOPHRENIA',
    sub: 'Videojuego de Horror Mobile',
    desc: 'Juego de terror 3D en primera persona para Android, hecho en equipo con Godot 4.6.',
    role: 'UI y programación',
    stack: ['Godot 4.6', 'GDScript', 'Blender', 'Android'],
    status: 'dev',
    accent: '#22d3ee',
    github: 'https://github.com/Divinepath6/Juego_terror',
    githubLabel: 'GitHub · Divinepath6',
    demo: null,
    repo: 'Divinepath6/Juego_terror',
  },
  {
    id: '03',
    title: 'sayola-days',
    sub: 'Habit Tracker — React Native',
    desc: 'App móvil de seguimiento de hábitos con modo oscuro/claro, auth local con AsyncStorage y reset diario automático.',
    stack: ['React Native', 'Expo SDK 54', 'Expo Router', 'AsyncStorage'],
    status: 'dev',
    accent: '#8b5cf6',
    github: 'https://github.com/SaidSar/sayola-days',
    demo: null,
    repo: 'SaidSar/sayola-days',
  },
  {
    id: '04',
    title: 'Luis Coffee Break POS',
    sub: 'Sistema Punto de Venta',
    desc: 'POS para cafetería con inventario, ventas y reportes en Excel. Incluye escaneo de menús con IA (Gemini).',
    stack: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Socket.io', 'Gemini API'],
    status: 'dev',
    accent: '#22d3ee',
    github: 'https://github.com/SaidSar/luis-coffee-pos',
    demo: null,
    repo: 'SaidSar/luis-coffee-pos',
  },
]

const STATUS = {
  live: { label: 'En producción', style: { border:'1px solid rgba(34,211,238,.4)', color:'#22d3ee', background:'rgba(34,211,238,.05)' } },
  dev:  { label: 'En desarrollo', style: { border:'1px solid rgba(251,191,36,.4)', color:'#fbbf24', background:'rgba(251,191,36,.05)' } },
}

const mono = { fontFamily:"'JetBrains Mono',monospace" }

function useGitHubStats(repo) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    if (!repo) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/repos/${repo}`, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d && d.stargazers_count !== undefined)
          setStats({
            stars: d.stargazers_count,
            updated: new Date(d.pushed_at).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }),
          })
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [repo])
  return stats
}

function Card({ p, delay }) {
  const [ref, visible] = useReveal(0.15)
  const gh = useGitHubStats(p.repo)
  const status = STATUS[p.status]

  return (
    <div ref={ref} className={`reveal${visible ? ' in' : ''}`} style={{ transitionDelay:`${delay}ms` }}>
      <article className="proj-card">
        <div aria-hidden="true" style={{ height:1, background:`linear-gradient(90deg,transparent,${p.accent},transparent)`, opacity:.7 }} />
        <div style={{ padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.2rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ ...mono, fontSize:'.7rem', color:'var(--txt-faint)', letterSpacing:'.2em', textTransform:'uppercase' }}>Proyecto {p.id}</div>
              <h3 className="ctitle">{p.title}</h3>
              <div style={{ fontSize:'.7rem', color:'var(--txt-dim)', marginTop:'.1rem' }}>{p.sub}</div>
            </div>
            <span style={{ ...status.style, ...mono, flexShrink:0, marginLeft:'.5rem', padding:'.25rem .7rem', borderRadius:999, fontSize:'.7rem', letterSpacing:'.1em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'.35rem' }}>
              {p.status === 'live' && <span className="anim-pulse" aria-hidden="true" style={{ width:6, height:6, borderRadius:'50%', background:'#22d3ee', display:'inline-block' }} />}
              {status.label}
            </span>
          </div>
          <p style={{ color:'#94a3b8', fontSize:'.82rem', lineHeight:1.7, fontWeight:300 }}>{p.desc}</p>
          {p.role && (
            <p className="proj-role"><span>Mi rol:</span> {p.role}</p>
          )}
          <ul style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', listStyle:'none', margin:0, padding:0 }}>
            {p.stack.map(t => (
              <li key={t} style={{ ...mono, padding:'.2rem .65rem', fontSize:'.7rem', color:'var(--txt-dim)', border:'1px solid #1e1e2a', borderRadius:3, background:'rgba(7,7,9,.5)' }}>{t}</li>
            ))}
          </ul>
          <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'.75rem', paddingTop:'.75rem', borderTop:'1px solid #1e1e2a' }}>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-link">
              <GitHubIcon />
              {p.githubLabel ?? 'GitHub'}
            </a>
            {gh && (
              <div style={{ display:'flex', gap:'.75rem', marginLeft:'auto' }}>
                <span style={{ ...mono, fontSize:'.7rem', color:'var(--txt-faint)' }} aria-label={`${gh.stars} estrellas en GitHub`}>★ {gh.stars}</span>
                <span style={{ ...mono, fontSize:'.7rem', color:'var(--txt-faint)' }} aria-label={`Última actualización: ${gh.updated}`}>↑ {gh.updated}</span>
              </div>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="card-link card-link-demo">Demo →</a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="section" style={{ background:'radial-gradient(ellipse at 30% 50%,rgba(139,92,246,.07) 0%,transparent 60%)' }}>
      <div className="container-x">
        <SectionHeader
          label="Proyectos"
          title="Lo que he"
          highlight="construido"
          desc="Proyectos académicos, personales y de portafolio."
        />

        <div className="proj-grid">
          {PROJECTS.map((p, i) => <Card key={p.id} p={p} delay={i * 120} />)}
        </div>

        <div style={{ marginTop:'3rem', textAlign:'center' }}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="gh-cta">
            <GitHubIcon />
            Ver todos los repositorios en GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
