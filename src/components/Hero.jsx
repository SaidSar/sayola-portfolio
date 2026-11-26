import { useEffect, useRef } from 'react'
import { scrollToId } from '../utils/scroll'

const ROLES = ['Software Engineer', 'Game Developer', 'Frontend Architect', 'React Native Dev']
const TECH = ['React', 'React Native', 'Azure', 'Godot Engine', 'Microsoft.NET', 'Tailwind CSS']
const SOCIALS = [
  { label: 'GH', href: 'https://github.com' },
  { label: 'LI', href: 'https://linkedin.com' },
  { label: 'TW', href: 'https://twitter.com' },
]

const S = {
  orb1: { position:'absolute', top:'22%', right:'22%', width:380, height:380, borderRadius:'50%', background:'rgba(139,92,246,.08)', filter:'blur(120px)', pointerEvents:'none' },
  orb2: { position:'absolute', bottom:'20%', left:'15%', width:320, height:320, borderRadius:'50%', background:'rgba(34,211,238,.05)', filter:'blur(100px)', pointerEvents:'none' },
  scanLine: { position:'absolute', left:0, right:0, height:60, background:'linear-gradient(to bottom,transparent,rgba(34,211,238,.08),transparent)', pointerEvents:'none', zIndex:2 },
  statusBadge: { position:'absolute', top:14, left:14, zIndex:3, display:'flex', alignItems:'center', gap:'.5rem', background:'rgba(7,7,9,.8)', backdropFilter:'blur(8px)', border:'1px solid #1e1e2a', padding:'.35rem .9rem', borderRadius:999 },
  statusDot: { width:8, height:8, borderRadius:'50%', background:'#22d3ee', flexShrink:0 },
  statusTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#22d3ee', letterSpacing:'.1em' },
  col: { display:'flex', flexDirection:'column', gap:'1.3rem' },
  eyebrow: { display:'flex', alignItems:'center', gap:'.75rem' },
  eyebrowLine: { height:1, width:32, background:'linear-gradient(90deg,#8b5cf6,#22d3ee)' },
  eyebrowTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.62rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase' },
  namePre: { fontFamily:"'Syne',sans-serif", fontSize:'.82rem', color:'#475569', letterSpacing:'.25em', textTransform:'uppercase', marginBottom:'.3rem' },
  typeRow: { display:'flex', alignItems:'center', gap:'.5rem', height:'1.4rem' },
  prompt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.78rem', color:'#475569' },
  twTxt: { fontFamily:"'JetBrains Mono',monospace", fontSize:'.78rem', color:'#22d3ee' },
  cursor: { display:'inline-block', width:2, height:'1rem', background:'#22d3ee', marginLeft:1, verticalAlign:'middle' },
  desc: { color:'#94a3b8', fontSize:'1rem', lineHeight:1.75, maxWidth:440, fontWeight:300 },
  pills: { display:'flex', flexWrap:'wrap', gap:'.45rem' },
  ctas: { display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'.25rem' },
  socials: { display:'flex', gap:'.7rem' },
}

function useTypewriter(words) {
  const ref = useRef(null)
  useEffect(() => {
    let i = 0, ci = 0, del = false, tid
    const type = () => {
      if (!ref.current) return
      const cur = words[i % words.length]
      if (!del) {
        ref.current.textContent = cur.slice(0, ++ci)
        if (ci === cur.length) { del = true; tid = setTimeout(type, 1800); return }
      } else {
        ref.current.textContent = cur.slice(0, --ci)
        if (ci === 0) { del = false; i++ }
      }
      tid = setTimeout(type, del ? 48 : 88)
    }
    tid = setTimeout(type, 800)
    return () => clearTimeout(tid)
  }, [words])
  return ref
}

export default function Hero() {
  const twRef = useTypewriter(ROLES)

  return (
    <section id="inicio" className="hero">
      <div className="grid-bg" style={{ position:'absolute', inset:0 }} />
      <div style={S.orb1} />
      <div style={S.orb2} />

      <div className="hero-grid">
        <div className="fade-up d1 hero-avatar-wrap">
          <div style={{ position:'relative', display:'inline-block' }}>
            <div className="bk-tl" /><div className="bk-tr" />
            <div className="bk-bl" /><div className="bk-br" />
            <div className="avatar-box anim-float">
              <div className="avatar-inner">
                <div className="anim-scan" style={S.scanLine} />
                <img
                  src="/fotoperfil.jpg"
                  alt="Sayola"
                  width={320}
                  height={400}
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

        <div style={S.col}>
          <div className="fade-up d1" style={S.eyebrow}>
            <div style={S.eyebrowLine} />
            <span style={S.eyebrowTxt}>Portfolio - 2026</span>
          </div>

          <div className="fade-up d2">
            <p style={S.namePre}>Hola, soy</p>
            <span className="hero-name">Sayola</span>
            <span className="hero-name-dev grad-text">.dev</span>
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
            {TECH.map(t => <span key={t} className="pill">{t}</span>)}
          </div>

          <div className="fade-up d6" style={S.ctas}>
            <button className="btn-p" onClick={() => scrollToId('proyectos')}>Ver proyectos</button>
            <button className="btn-s" onClick={() => scrollToId('contacto')}>Contáctame</button>
          </div>

          <div className="fade-up d7" style={S.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.6rem', color:'#64748b', letterSpacing:'.2em', textTransform:'uppercase' }}>Scroll</span>
        <div style={{ width:12, height:12, borderRight:'1px solid #64748b', borderBottom:'1px solid #64748b', transform:'rotate(45deg)' }} />
      </div>
    </section>
  )
}
