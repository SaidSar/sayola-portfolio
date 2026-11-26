export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid #1e1e2a', background:'#070709', padding:'2rem 0' }}>
      <div className="container-x footer-inner">
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.1rem', letterSpacing:'.2em', textTransform:'uppercase' }}>
          <span style={{ color:'#fff' }}>SAY</span>
          <span style={{ color:'#8b5cf6', textShadow:'0 0 20px rgba(139,92,246,.8)' }}>OLA</span>
          <span style={{ color:'#22d3ee' }}>.</span>
        </div>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', color:'var(--txt-faint)', letterSpacing:'.1em' }}>
          © {new Date().getFullYear()} — Diseñado & desarrollado con 💜 por Sayola
        </p>
      </div>
    </footer>
  )
}
