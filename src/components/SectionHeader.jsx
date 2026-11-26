import useReveal from '../hooks/useReveal'

export default function SectionHeader({ label, title, highlight, desc, accent = '#8b5cf6', reverse = false }) {
  const [ref, visible] = useReveal(0.2)

  return (
    <div ref={ref} className={`section-header reveal${visible ? ' in' : ''}`}>
      <div className="section-eyebrow">
        <div style={{ height:1, width:32, background:`linear-gradient(90deg,${accent},transparent)` }} />
        <span className="section-label">/ {label}</span>
      </div>
      <h2 className="section-title">
        {title && <>{title}<br /></>}
        <span className={reverse ? 'grad-text-rev' : 'grad-text'}>{highlight}</span>
      </h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  )
}
