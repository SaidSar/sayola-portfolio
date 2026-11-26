import { useEffect, useRef, useState } from 'react'

const GROUPS = [
  {
    label: 'Frontend', icon: '◈', cyan: false,
    skills: [
      { n: 'React / Vite',      v: 90 },
      { n: 'JavaScript ES6+',   v: 88 },
      { n: 'HTML5 / CSS3',      v: 92 },
      { n: 'Tailwind CSS',      v: 85 },
      { n: 'TypeScript',        v: 68 },
    ],
  },
  {
    label: 'Mobile & Backend', icon: '◉', cyan: true,
    skills: [
      { n: 'React Native + Expo', v: 78 },
      { n: 'ASP.NET Core',        v: 75 },
      { n: 'Node.js + Express',   v: 68 },
      { n: '.NET MAUI',           v: 62 },
    ],
  },
  {
    label: 'Game Dev', icon: '◆', cyan: false,
    skills: [
      { n: 'Godot Engine 4.6', v: 82 },
      { n: 'GDScript',         v: 80 },
      { n: 'Blender (3D)',     v: 55 },
      { n: 'Game Design',      v: 74 },
    ],
  },
  {
    label: 'DB & Cloud', icon: '◇', cyan: true,
    skills: [
      { n: 'SQL Server / EF Core',    v: 75 },
      { n: 'PostgreSQL / Supabase',   v: 68 },
      { n: 'Azure',                   v: 60 },
      { n: 'Git / GitHub',            v: 86 },
    ],
  },
]

const STATS = [
  { num: '7°',   label: 'Semestre — UAdeO' },
  { num: '6+',   label: 'Proyectos activos' },
  { num: '5',    label: 'Stacks diferentes' },
  { num: '2027', label: 'Graduación esperada' },
]

function SkillGroup({ g, delay }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="skill-card" style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.2rem' }}>
        <span style={{ fontSize:'1.1rem', color: g.cyan ? '#22d3ee' : '#8b5cf6' }}>{g.icon}</span>
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#fff', letterSpacing:'.04em' }}>{g.label}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'.9rem' }}>
        {g.skills.map((s, i) => (
          <div key={s.n}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.35rem' }}>
              <span style={{ fontSize:'.78rem', color:'#94a3b8' }}>{s.n}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569' }}>{s.v}%</span>
            </div>
            <div className="bar-track">
              {vis && <div className={`bar-fill${g.cyan ? ' c' : ''}`} style={{ '--bw':`${s.v}%`, animationDelay:`${delay + i * 80}ms` }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const hdrRef = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    if (hdrRef.current) obs.observe(hdrRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" style={{ padding:'7rem 0', position:'relative', background:'#0e0e12' }}>
      <div className="grid-bg" style={{ position:'absolute', inset:0, opacity:.6 }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 2.5rem', position:'relative', zIndex:1 }}>
        {/* header */}
        <div ref={hdrRef} style={{ marginBottom:'4rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition:'all .65s ease' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
            <div style={{ height:1, width:32, background:'linear-gradient(90deg,#22d3ee,transparent)' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase' }}> / Skills</span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'3.5rem', lineHeight:1.05, color:'#fff' }}>
            Arsenal<br />
            <span className="grad-text-rev">técnico</span>
          </h2>
          <p style={{ marginTop:'.75rem', color:'#64748b', fontWeight:300, maxWidth:400, fontSize:'.95rem', lineHeight:1.7 }}>
            Tecnologías que aplico en proyectos reales — desde apps web hasta videojuegos.
          </p>
        </div>

        {/* grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem', marginBottom:'4rem' }}>
          {GROUPS.map((g, i) => <SkillGroup key={g.label} g={g} delay={i * 100} />)}
        </div>

        {/* stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.5rem' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign:'center', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition:`all .65s ease ${i * 100 + 400}ms` }}>
              <div className="grad-text" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'2.5rem' }}>{s.num}</div>
              <div style={{ fontSize:'.7rem', color:'#475569', marginTop:'.25rem', letterSpacing:'.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}