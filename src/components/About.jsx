import useReveal from '../hooks/useReveal'
import SectionHeader from './SectionHeader'
import { CV_URL } from '../config/site'

const FACTS = [
  { num: '7.º',  label: 'Semestre — UAdeO' },
  { num: '2027', label: 'Graduación esperada' },
]

const AREAS = ['Web', 'Móvil', 'Videojuegos']

export default function About() {
  const [ref, visible] = useReveal(0.15)

  return (
    <section id="sobre-mi" className="section">
      <div className="container-x">
        <SectionHeader label="Sobre mí" title="Quién" highlight="soy" />

        <div ref={ref} className="about-grid">
          <div className={`reveal${visible ? ' in' : ''}`}>
            <p className="about-bio">
              Soy estudiante de 7.º semestre de la Licenciatura en Ingeniería de Software en la UAdeO (Sinaloa),
              con graduación esperada en 2027. Desarrollo proyectos web, móviles y videojuegos,
              y actualmente busco prácticas profesionales.
            </p>
            <ul className="about-areas" aria-label="Áreas de trabajo">
              {AREAS.map(a => <li key={a} className="pill">{a}</li>)}
            </ul>
            {CV_URL && (
              <a href={CV_URL} download className="btn-p about-cv">Descargar CV</a>
            )}
          </div>

          <div className={`about-facts reveal${visible ? ' in' : ''}`} style={{ transitionDelay:'150ms' }}>
            <div className="stats-grid">
              {FACTS.map(f => (
                <div key={f.label} className="about-fact">
                  <div className="grad-text stat-num">{f.num}</div>
                  <div className="about-fact-label">{f.label}</div>
                </div>
              ))}
            </div>
            <div className="about-status">
              <span className="anim-pulse" aria-hidden="true" />
              Buscando prácticas profesionales
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
