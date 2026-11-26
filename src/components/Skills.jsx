import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'

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
  const [ref, visible] = useReveal(0.1)

  return (
    <div ref={ref} className={`skill-card reveal${visible ? ' in' : ''}`} style={{ transitionDelay:`${delay}ms` }}>
      <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.2rem' }}>
        <span aria-hidden="true" style={{ fontSize:'1.1rem', color: g.cyan ? '#22d3ee' : '#8b5cf6' }}>{g.icon}</span>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#fff', letterSpacing:'.04em' }}>{g.label}</h3>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:'.9rem' }}>
        {g.skills.map((s, i) => (
          <div key={s.n}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.35rem' }}>
              <span style={{ fontSize:'.78rem', color:'#94a3b8' }}>{s.n}</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:'var(--txt-dim)' }}>{s.v}%</span>
            </div>
            <div className="bar-track">
              {visible && <div className={`bar-fill${g.cyan ? ' c' : ''}`} style={{ '--bw':`${s.v}%`, animationDelay:`${delay + i * 80}ms` }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [statsRef, statsVisible] = useReveal(0.2)

  return (
    <section id="skills" className="section" style={{ background:'#0e0e12' }}>
      <div className="grid-bg" aria-hidden="true" style={{ position:'absolute', inset:0, opacity:.6 }} />
      <div className="container-x" style={{ position:'relative', zIndex:1 }}>
        <SectionHeader
          label="Skills"
          title="Arsenal"
          highlight="técnico"
          desc="Tecnologías que aplico en proyectos reales — desde apps web hasta videojuegos."
          accent="#22d3ee"
          reverse
        />

        <div className="skills-grid">
          {GROUPS.map((g, i) => <SkillGroup key={g.label} g={g} delay={i * 100} />)}
        </div>

        <div ref={statsRef} className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className={`reveal${statsVisible ? ' in' : ''}`} style={{ textAlign:'center', transitionDelay:`${i * 100}ms` }}>
              <div className="grad-text stat-num">{s.num}</div>
              <div style={{ fontSize:'.7rem', color:'var(--txt-dim)', marginTop:'.25rem', letterSpacing:'.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
