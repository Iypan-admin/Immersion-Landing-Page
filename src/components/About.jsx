import { useEffect, useRef } from 'react'
import './About.css'

const features = [
  {
    icon: '🎯',
    title: 'Goal-Oriented Curriculum',
    desc: 'Every lesson is built around hitting the exact language level required for your target university or program abroad.',
  },
  {
    icon: '🗣️',
    title: 'Live Immersion Sessions',
    desc: 'Think, speak, and dream in your target language. Real-time interactive classes that replicate a native environment.',
  },
  {
    icon: '📈',
    title: 'Rapid Level Progression',
    desc: 'Our structured pathways take you from zero to study-ready in months — not years — with proven immersion techniques.',
  },
  {
    icon: '🌍',
    title: 'Study Abroad Focused',
    desc: 'Designed specifically for students heading to Germany, France, or Japan. Know exactly what level you need and how to get there.',
  },
]

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section about" ref={ref} id="about">
      <div className="container">
        <div className="text-center">
          <div className="badge reveal">✦ What Is Immersion Learning</div>
          <h2 className="section-title reveal">
            Language Learning,<br /><span>Reimagined</span>
          </h2>
          <p className="section-subtitle reveal">
            Immersion learning isn't just studying a language — it's living it.
            Our programs are built to get you fluent fast and study-abroad ready.
          </p>
        </div>

        <div className="about__grid">
          {features.map((f, i) => (
            <div key={f.title} className={`about__card reveal delay-${i + 1}`}>
              <div className="about__card-icon">{f.icon}</div>
              <h3 className="about__card-title">{f.title}</h3>
              <p className="about__card-desc">{f.desc}</p>
              <div className="about__card-glow" />
            </div>
          ))}
        </div>

        {/* Journey strip */}
        <div className="about__journey reveal">
          <div className="journey__step">
            <div className="journey__dot">1</div>
            <div className="journey__label">Enroll</div>
          </div>
          <div className="journey__line" />
          <div className="journey__step">
            <div className="journey__dot">2</div>
            <div className="journey__label">Immerse</div>
          </div>
          <div className="journey__line" />
          <div className="journey__step">
            <div className="journey__dot">3</div>
            <div className="journey__label">Progress</div>
          </div>
          <div className="journey__line" />
          <div className="journey__step">
            <div className="journey__dot journey__dot--gold">4</div>
            <div className="journey__label">Fly Abroad ✈️</div>
          </div>
        </div>
      </div>
    </section>
  )
}
