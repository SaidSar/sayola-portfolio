import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'

const LEVELS = {
  basico:     { label: 'Básico',     dots: 1 },
  intermedio: { label: 'Intermedio', dots: 2 },
  avanzado:   { label: 'Avanzado',   dots: 3 },
}

const GROUPS = [
  {
    label: 'Frontend', icon: '◈', cyan: false,
    skills: [
      { name: 'React / Vite',    level: 'avanzado' },
      { name: 'JavaScript ES6+', level: 'avanzado' },
      { name: 'HTML5 / CSS3',    level: 'avanzado' },
      { name: 'Tailwind CSS',    level: 'avanzado' },
      { name: 'TypeScript',      level: 'intermedio' },
    ],
  },
  {
    label: 'Mobile & Backend', icon: '◉', cyan: true,
    skills: [
      { name: 'React Native + Expo', level: 'intermedio' },
      { name: 'ASP.NET Core',        level: 'intermedio' },
      { name: 'Node.js + Express',   level: 'intermedio' },
      { name: '.NET MAUI',           level: 'basico' },
    ],
  },
  {
    label: 'Game Dev', icon: '◆', cyan: false,
    skills: [
      { name: 'Godot Engine 4.6', level: 'intermedio' },
      { name: 'GDScript',         level: 'intermedio' },
      { name: 'Blender (3D)',     level: 'basico' },
      { name: 'Game Design',      level: 'intermedio' },
    ],
  },
  {
    label: 'DB & Cloud', icon: '◇', cyan: true,
    skills: [
      { name: 'SQL Server / EF Core',  level: 'intermedio' },
      { name: 'PostgreSQL / Supabase', level: 'intermedio' },
      { name: 'Azure',                 level: 'basico' },
      { name: 'Git / GitHub',          level: 'avanzado' },
    ],
  },
]

function LevelBadge({ level, cyan }) {
  const { label, dots } = LEVELS[level]
  return (
    <span className={`skill-level lvl-${level}${cyan ? ' c' : ''}`}>
      <span className="skill-dots" aria-hidden="true">
        {[1, 2, 3].map(i => <span key={i} className={`skill-dot${i <= dots ? ' on' : ''}`} />)}
      </span>
      {label}
    </span>
  )
}

function SkillGroup({ g, delay }) {
  const [ref, visible] = useReveal(0.1)

  return (
    <div ref={ref} className={`skill-card reveal${visible ? ' in' : ''}`} style={{ transitionDelay:`${delay}ms` }}>
      <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'1.2rem' }}>
        <span aria-hidden="true" style={{ fontSize:'1.1rem', color: g.cyan ? '#22d3ee' : '#8b5cf6' }}>{g.icon}</span>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:'.85rem', color:'#fff', letterSpacing:'.04em' }}>{g.label}</h3>
      </div>
      <ul className="skill-list">
        {g.skills.map(s => (
          <li key={s.name} className="skill-row">
            <span className="skill-name">{s.name}</span>
            <LevelBadge level={s.level} cyan={g.cyan} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
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

        <p className="skills-note">Niveles autoevaluados a partir de mi experiencia en proyectos.</p>
      </div>
    </section>
  )
}
