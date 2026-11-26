import { useState, useEffect } from 'react'
import { scrollToId } from '../utils/scroll'

const links = [
  { label: 'Inicio',    href: 'inicio'    },
  { label: 'Proyectos', href: 'proyectos' },
  { label: 'Skills',    href: 'skills'    },
  { label: 'Contacto',  href: 'contacto'  },
]

const SECTION_IDS = links.map(l => l.href)
const SPY_OFFSET = 130

function currentSection() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  if (atBottom) return SECTION_IDS[SECTION_IDS.length - 1]
  let cur = SECTION_IDS[0]
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - SPY_OFFSET) cur = id
  }
  return cur
}

export default function Navbar() {
  const [active, setActive] = useState(SECTION_IDS[0])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setActive(currentSection())
      })
    }
    setActive(currentSection())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const go = (id) => {
    scrollToId(id)
    setActive(id)
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button onClick={() => go('inicio')} className="nav-logo">
          <span style={{ color: '#fff' }}>SAY</span>
          <span style={{ color: '#8b5cf6', textShadow: '0 0 20px rgba(139,92,246,.8)' }}>OLA</span>
          <span style={{ color: '#22d3ee' }}>.</span>
        </button>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <button onClick={() => go(l.href)} className={`nav-link ${active === l.href ? 'active' : ''}`}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button onClick={() => go('contacto')} className="nav-badge">
          <span className="anim-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', display: 'inline-block' }} />
          Disponible
        </button>

        <button onClick={() => setOpen(!open)} className="nav-burger">
          {[0, 1, 2].map(i => (
            <span key={i} className="nav-burger-line" style={{
              transform: open && i === 0 ? 'translateY(6px) rotate(45deg)' : open && i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      <div className={`nav-mobile${open ? ' open' : ''}`}>
        <ul className="nav-mobile-list">
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
