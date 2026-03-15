import { useEffect, useRef, useState } from 'react'
import './About.css'

const features = [
  { icon: '🎯', title: 'Goal-Oriented Curriculum',  desc: 'Every lesson targets the exact language level you need for your dream university abroad.' },
  { icon: '🗣️', title: 'Live Immersion Sessions',   desc: 'Think, speak and dream in your language. Real-time classes that replicate a native environment.' },
  { icon: '📈', title: 'Rapid Level Progression',   desc: 'From zero to study-ready in months — not years — with our proven immersion techniques.' },
  { icon: '🌍', title: 'Study Abroad Focused',      desc: 'Built for students heading to Germany, France or Japan. Know exactly what level you need.' },
]

const journeySteps = [
  { num: '1', label: 'Enroll',     icon: '📋', desc: 'Pick your language & level',   gold: false },
  { num: '2', label: 'Immerse',    icon: '🗣️', desc: 'Live classes, real immersion', gold: false },
  { num: '3', label: 'Progress',   icon: '📈', desc: 'Track growth, pass exams',      gold: false },
  { num: '4', label: 'Fly Abroad', icon: '✈️', desc: 'Reach your dream destination', gold: true  },
]

export default function About() {
  const ref = useRef(null)
  const [journeyVisible, setJourneyVisible] = useState(false)
  const [activeStep, setActiveStep]         = useState(-1)

  // Scroll-reveal for all .reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    // Separate observer for journey — fires step animation
    const journeyEl = ref.current?.querySelector('.about__journey')
    const journeyObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setJourneyVisible(true); journeyObserver.disconnect() }
        })
      },
      { threshold: 0.25 }
    )
    if (journeyEl) journeyObserver.observe(journeyEl)

    return () => { observer.disconnect(); journeyObserver.disconnect() }
  }, [])

  // Stagger each step: 0ms, 480ms, 960ms, 1440ms
  useEffect(() => {
    if (!journeyVisible) return
    journeySteps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), i * 480 + 150)
    })
  }, [journeyVisible])

  return (
    <section className="section about" ref={ref} id="about">
      <div className="container">

        {/* Header */}
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

        {/* 2×2 feature cards on mobile, 4-col on desktop */}
        <div className="about__grid">
          {features.map((f, i) => (
            <div key={f.title} className={`about__card reveal delay-${i + 1}`}>
              <div className="about__card-top">
                <span className="about__card-icon">{f.icon}</span>
              </div>
              <h3 className="about__card-title">{f.title}</h3>
              <p className="about__card-desc">{f.desc}</p>
              <div className="about__card-glow" />
            </div>
          ))}
        </div>

        {/* Journey — vertical on mobile, horizontal on desktop */}
        <div className="about__journey reveal">
          {journeySteps.map((step, i) => (
            <div
              key={step.num}
              className={`journey__step ${activeStep >= i ? 'is-active' : ''}`}
            >
              {/* Left: dot + line (line hidden on last step) */}
              <div className="journey__indicator">
                <div className={`journey__dot ${step.gold ? 'journey__dot--gold' : ''}`}>
                  <span className="journey__dot-num">{step.num}</span>
                  <span className="journey__dot-icon">{step.icon}</span>
                </div>
                {i < journeySteps.length - 1 && (
                  <div className="journey__line" />
                )}
              </div>

              {/* Right: label + description */}
              <div className="journey__text">
                <span className="journey__label">{step.label}</span>
                <span className="journey__sublabel">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
