import { useState, useEffect, useRef } from 'react'
import './Programs.css'
import ismlLogo from '../assets/isml-logo.webp'
import slLogo from '../assets/success-learning-logo.png'

const programs = [
  {
    lang: 'French', flag: '🇫🇷', destination: 'France / Canada',
    color: '#4f6ef7', glow: 'rgba(79,110,247,0.25)',
    batches: [
      { level: 'A1 → B2', duration: '9 Months', sessions: '3x / week', tag: 'Complete Track' },
      { level: 'A1 → B1', duration: '6 Months', sessions: '3x / week', tag: 'Foundation' },
    ],
    desc: 'From bonjour to fluent. Get B1/B2 ready for admission to top French universities and grandes écoles.',
  },
  {
    lang: 'German', flag: '🇩🇪', destination: 'Germany / Austria',
    color: '#e8c96a', glow: 'rgba(232,201,106,0.2)',
    batches: [
      { level: 'A1 → B2', duration: '9 Months', sessions: '3x / week', tag: 'Complete Track' },
      { level: 'A1 → B1', duration: '6 Months', sessions: '3x / week', tag: 'Foundation' },
    ],
    desc: 'Germany requires B1/B2 for most universities. Our immersion method gets you there with confidence.',
  },
  {
    lang: 'Japanese', flag: '🇯🇵', destination: 'Japan',
    color: '#e86a9e', glow: 'rgba(232,106,158,0.2)',
    batches: [
      { level: 'N5 → N3', duration: '10 Months', sessions: '4x / week', tag: 'Advanced Track' },
      { level: 'N5 → N4', duration: '6 Months',  sessions: '3x / week', tag: 'Foundation' },
    ],
    desc: 'JLPT N3 is the gateway to Japan\'s top universities. Start at zero and reach exam-ready fast.',
  },
]

export default function Programs() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const prog = programs[active]

  return (
    <section className="section programs" id="programs" ref={ref}>
      <div className="container">

        <div className="text-center">
          <div className="badge reveal">✦ Available Programs</div>
          <h2 className="section-title reveal">
            Choose Your<br /><span>Language Journey</span>
          </h2>
          <p className="section-subtitle reveal">
            Three languages. Multiple levels. One mission: get you study-abroad ready.
          </p>
        </div>

        {/* ── Partnership banner ── */}
        <div className="programs__partnership reveal">
          <div className="programs__partnership-left">
            <div className="programs__partner-logo-wrap">
              <div className="programs__partner-logo-circle">
                <img src={ismlLogo} alt="ISML" />
              </div>
              <div className="programs__partner-logo-sl">
                <img src={slLogo} alt="Success Learning" />
              </div>
            </div>
          </div>
          <div className="programs__partnership-right">
            <p className="programs__partnership-tag">✦ The Smarter Path to Study Abroad</p>
            <p className="programs__partnership-desc">
              <strong>ISML</strong> trains you to master the language.&nbsp;
              <strong>Success Learning</strong> guides you to the right university abroad.
              Together — your complete study abroad solution.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="programs__tabs reveal">
          {programs.map((p, i) => (
            <button
              key={p.lang}
              className={`programs__tab ${active === i ? 'programs__tab--active' : ''}`}
              onClick={() => setActive(i)}
              style={active === i ? { '--tab-color': p.color } : {}}
            >
              <span>{p.flag}</span>
              <span>{p.lang}</span>
            </button>
          ))}
        </div>

        {/* Program panel */}
        <div className="programs__panel reveal" key={active}
          style={{ '--panel-glow': prog.glow, '--panel-color': prog.color }}>
          <div className="programs__panel-left">
            <div className="programs__panel-header">
              <span className="programs__flag">{prog.flag}</span>
              <div>
                <h3 className="programs__lang-title">{prog.lang} Immersion</h3>
                <p className="programs__destination">📍 Study Destination: {prog.destination}</p>
              </div>
            </div>
            <p className="programs__panel-desc">{prog.desc}</p>
            <ul className="programs__features">
              {[
                'Live interactive sessions',
                'Expert native-level instructors',
                'Study abroad counseling included',
                'Certificate upon completion',
              ].map(f => (
                <li key={f}><span className="check-icon">✓</span>{f}</li>
              ))}
            </ul>
            <a href="#enquire" className="btn btn--primary programs__cta">
              Enquire About {prog.lang}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="programs__panel-right">
            {prog.batches.map(b => (
              <div key={b.level} className="batch-card">
                <div className="batch-card__top">
                  <span className="batch-card__tag">{b.tag}</span>
                  <span className="batch-card__level">{b.level}</span>
                </div>
                <div className="batch-card__details">
                  <div className="batch-detail">
                    <span className="batch-detail__icon">⏱</span>
                    <span className="batch-detail__label">Duration</span>
                    <span className="batch-detail__val">{b.duration}</span>
                  </div>
                  <div className="batch-detail">
                    <span className="batch-detail__icon">📅</span>
                    <span className="batch-detail__label">Sessions</span>
                    <span className="batch-detail__val">{b.sessions}</span>
                  </div>
                </div>
                <a href="#enquire" className="batch-card__btn">Apply for this batch →</a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
