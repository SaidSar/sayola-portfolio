import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio',    href: 'inicio'    },
  { label: 'Proyectos', href: 'proyectos' },
  { label: 'Skills',    href: 'skills'    },
  { label: 'Contacto',  href: 'contacto'  },
]

export default function Navbar() {
  const [active, setActive] = useState('inicio')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const ids = ['inicio', 'proyectos', 'skills', 'contacto']
      let cur = 'inicio'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <button onClick={() => go('inicio')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem', letterSpacing: '.2em', textTransform: 'uppercase' }}>
          <span style={{ color: '#fff' }}>SAY</span>
          <span style={{ color: '#8b5cf6', textShadow: '0 0 20px rgba(139,92,246,.8)' }}>OLA</span>
          <span style={{ color: '#22d3ee' }}>.</span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} className={`nav-link ${active === l.href ? 'active' : ''}`}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Badge */}
        <button
          onClick={() => go('contacto')}
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '.5rem', padding: '.4rem 1.1rem', border: '1px solid rgba(139,92,246,.45)', borderRadius: 4, background: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#8b5cf6', transition: 'all .3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,.1)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(139,92,246,.3)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <span className="anim-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
          Disponible
        </button>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="flex md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 6 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', height: 1, width: 24, background: '#94a3b8',
              transition: 'all .3s',
              transform: open && i === 0 ? 'rotate(45deg) translateY(8px)' : open && i === 2 ? 'rotate(-45deg) translateY(-8px)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{ maxHeight: open ? 240 : 0, overflow: 'hidden', transition: 'max-height .3s', background: 'rgba(7,7,9,.95)', borderBottom: open ? '1px solid #1e1e2a' : 'none' }}>
        <ul style={{ padding: '1.5rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', listStyle: 'none', margin: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} className={`nav-link ${active === l.href ? 'active' : ''}`}>{l.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
