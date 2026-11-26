import { useEffect, useRef } from 'react'

const ROLES = ['Software Engineer', 'Game Developer', 'Frontend Architect', 'React Native Dev']

const S = {
  section: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    position: 'relative', paddingTop: 72,
    background: 'radial-gradient(ellipse at 70% 50%, rgba(139,92,246,.1) 0%, transparent 60%), radial-gradient(ellipse at 25% 80%, rgba(34,211,238,.07) 0%, transparent 50%)',
  },
  orb1: { position:'absolute', top:'22%', right:'22%', width:380, height:380, borderRadius:'50%', background:'rgba(139,92,246,.08)', filter:'blur(120px)', pointerEvents:'none' },
  orb2: { position:'absolute', bottom:'20%', left:'15%', width:320, height:320, borderRadius:'50%', background:'rgba(34,211,238,.05)', filter:'blur(100px)', pointerEvents:'none' },
  inner: { maxWidth:1280, margin:'0 auto', padding:'2rem 2.5rem 4rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center', position:'relative', zIndex:2, width:'100%' },
  avatarWrap: { display:'flex', justifyContent:'center' },
  avatarRel: { position:'relative', display:'inline-block' },
  avatarBox: { width:320, height:400, borderRadius:16, overflow:'hidden', border:'1px solid #1e1e2a', position:'relative' },
  avatarInner: { width:'100%', height:'100%', background:'linear-gradient(135deg,#13131a,#0e0e12,#070709)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem', position:'relative', overflow:'hidden', transition:'transform .7s' },
  scanLine: { position:'absolute', left:0, right:0, height:60, background:'linear-gradient(to bottom,transparent,rgba(34,211,238,.08),transparent)', pointerEvents:'none', zIndex:2 },
  avatarCircle: { width:110, height:110, borderRadius:'50%', background:'linear-gradient(135deg,rgba(139,92,246,.3),rgba(34,211,238,.2))', border:'1px solid rgba(139,92,246,.3)', display:'flex', alignItems:'center', justifyContent:'center' },
  hint: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.65rem', color:'#475569' },
  statusBadge: { position:'absolute', top:14, left:14, zIndex:3, display:'flex', alignItems:'center', gap:'.5rem', background:'rgba(7,7,9,.8)', backdropFilter:'blur(8px)', border:'1px solid #1e1e2a', padding:'.35rem .9rem', borderRadius:999 },
  statusDot: { width:8, height:8, borderRadius:'50%', background:'#22d3ee', flexShrink:0 },
  statusTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#22d3ee', letterSpacing:'.1em' },
  col: { display:'flex', flexDirection:'column', gap:'1.3rem' },
  eyebrow: { display:'flex', alignItems:'center', gap:'.75rem' },
  eyebrowLine: { height:1, width:32, background:'linear-gradient(90deg,#8b5cf6,#22d3ee)' },
  eyebrowTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase' },
  namePre: { fontFamily:"'Syne',sans-serif", fontSize:'.82rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase', marginBottom:'.3rem' },
  nameMain: { fontFamily:"'Syne',sans-serif", fontSize:'5.5rem', fontWeight:800, color:'#fff', lineHeight:.9, display:'block' },
  typeRow: { display:'flex', alignItems:'center', gap:'.5rem', height:'1.4rem' },
  prompt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.78rem', color:'#475569' },
  twTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.78rem', color:'#22d3ee' },
  cursor: { display:'inline-block', width:2, height:'1rem', background:'#22d3ee', marginLeft:1, verticalAlign:'middle' },
  desc: { color:'#94a3b8', fontSize:'1rem', lineHeight:1.75, maxWidth:440, fontWeight:300 },
  pills: { display:'flex', flexWrap:'wrap', gap:'.45rem' },
  ctas: { display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'.25rem' },
  socials: { display:'flex', gap:'.7rem' },
}

export default function Hero() {
  const twRef  = useRef(null)
  const boxRef = useRef(null)

  // Typewriter
  useEffect(() => {
    let i = 0, ci = 0, del = false, tid
    const type = () => {
      if (!twRef.current) return
      const cur = ROLES[i % ROLES.length]
      if (!del) {
        twRef.current.textContent = cur.slice(0, ++ci)
        if (ci === cur.length) { del = true; tid = setTimeout(type, 1800); return }
      } else {
        twRef.current.textContent = cur.slice(0, --ci)
        if (ci === 0) { del = false; i++ }
      }
      tid = setTimeout(type, del ? 48 : 88)
    }
    tid = setTimeout(type, 800)
    return () => clearTimeout(tid)
  }, [])

  // Avatar hover
  const onHoverIn  = () => { if (boxRef.current) boxRef.current.style.transform = 'scale(1.04)' }
  const onHoverOut = () => { if (boxRef.current) boxRef.current.style.transform = 'scale(1)' }

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="inicio" style={S.section}>
      <div className="grid-bg" style={{ position:'absolute', inset:0 }} />
      <div style={S.orb1} />
      <div style={S.orb2} />

      <div style={S.inner}>

        {/* ── Avatar ── */}
                <div className="fade-up d1" style={S.avatarWrap}>
                  <div style={S.avatarRel}>
                    <div className="bk-tl" /><div className="bk-tr" />
                    <div className="bk-bl" /><div className="bk-br" />
                    <div style={S.avatarBox} className="anim-float" onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
                      <div ref={boxRef} style={S.avatarInner}>
                        <div className="anim-scan" style={S.scanLine} />
                        <img
                          src="/fotoperfil.jpg"
                          alt="Sayola"
                          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
                        />
                      </div>
                      <div style={S.statusBadge}>
                        <span className="anim-pulse" style={S.statusDot} />
                        <span style={S.statusTxt}>Open to work</span>
                      </div>
                    </div>
                  </div>
                </div>

        {/* ── Text ── */}
        <div style={S.col}>
          <div className="fade-up d1" style={S.eyebrow}>
            <div style={S.eyebrowLine} />
            <span style={S.eyebrowTxt}>Portfolio - 2026</span>
          </div>

          <div className="fade-up d2">
            <p style={S.namePre}>Hola, soy</p>
            <span style={S.nameMain}>Sayola</span>
            <span className="grad-text" style={{ fontFamily:"'Syne',sans-serif", fontSize:'4.5rem', fontWeight:800, lineHeight:.9, display:'block' }}>.dev</span>
          </div>

          <div className="fade-up d3" style={S.typeRow}>
            <span style={S.prompt}>$&gt;</span>
            <span ref={twRef} style={S.twTxt} />
            <span className="anim-blink" style={S.cursor} />
          </div>

          <p className="fade-up d4" style={S.desc}>
            Construyo experiencias digitales que viven entre el código limpio y el diseño épico.
            Desde arquitecturas web escalables hasta videojuegos inmersivos — si existe en una pantalla, puedo crearlo.
          </p>

          <div className="fade-up d5" style={S.pills}>
            {['React', 'React Native', 'Azure', 'Godot Engine', 'Microsoft.NET', 'Tailwind CSS'].map(t => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>

          <div className="fade-up d6" style={S.ctas}>
            <button className="btn-p" onClick={() => go('proyectos')}>Ver proyectos</button>
            <button className="btn-s" onClick={() => go('contacto')}>Contáctame</button>
          </div>

          <div className="fade-up d7" style={S.socials}>
            {[['GH','https://github.com'],['LI','https://linkedin.com'],['TW','https://twitter.com']].map(([l, h]) => (
              <SocialBtn key={l} href={h}>{l}</SocialBtn>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.4rem', opacity:.3 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color:'#64748b', letterSpacing:'.2em', textTransform:'uppercase' }}>Scroll</span>
        <div style={{ width:12, height:12, borderRight:'1px solid #64748b', borderBottom:'1px solid #64748b', transform:'rotate(45deg)' }} />
      </div>
    </section>
  )
}

function Pill({ children }) {
  const [hov, setHov] = React.useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding:'.28rem .8rem', fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', border:`1px solid ${hov ? 'rgba(139,92,246,.5)' : '#1e1e2a'}`, background:'#13131a', color: hov ? '#a78bfa' : '#94a3b8', borderRadius:4, cursor:'default', transition:'all .25s' }}
    >
      {children}
    </span>
  )
}

function SocialBtn({ href, children }) {
  const [hov, setHov] = React.useState(false)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width:36, height:36, border:`1px solid ${hov ? '#8b5cf6' : '#1e1e2a'}`, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color: hov ? '#8b5cf6' : '#475569', textDecoration:'none', transition:'all .25s', boxShadow: hov ? '0 0 12px rgba(139,92,246,.3)' : 'none' }}
    >
      {children}
    </a>
  )
}

import React from 'react'
