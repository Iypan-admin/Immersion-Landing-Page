import { useState, useEffect, useRef } from 'react'
import './Programs.css'
import ismlLogo from '../assets/isml-logo.webp'
import slLogo from '../assets/success-learning-logo.png'

const programs = [
  {
    lang: 'French',
    flagUrl: 'https://flagcdn.com/w80/fr.png', 
    destination: 'France / Canada',
    color: '#4f6ef7',
    glow: 'rgba(79,110,247,0.22)',
    desc: 'From bonjour to fluent. Get B1/B2 ready for admission to top French universities and grandes écoles.',
    batches: [
      { level: 'A1 → B1', duration: '5 Months', mode: 'Online', type: 'Immersion', fullFee: '₹48,676', monthly: '₹9,735', tag: 'Intermediate' },
      { level: 'A1 → B2', duration: '6 Months', mode: 'Online', type: 'Immersion', fullFee: '₹58,675', monthly: '₹9,779', tag: 'Advance' },
    ],
  },
  {
    lang: 'German',
    flagUrl: 'https://flagcdn.com/w80/de.png', 
    destination: 'Germany',
    color: '#e8c96a',
    glow: 'rgba(232,201,106,0.18)',
    desc: 'Germany requires B1/B2 for most universities. Our immersion method gets you there with confidence.',
    batches: [
      { level: 'A1 → B1', duration: '5 Months', mode: 'Online', type: 'Immersion', fullFee: '₹48,676', monthly: '₹9,735', tag: 'Intermediate' },
      { level: 'A1 → B2', duration: '6 Months', mode: 'Online', type: 'Immersion', fullFee: '₹58,675', monthly: '₹9,779', tag: 'Advance' },
    ],
  },
  {
    lang: 'Japanese',
    flagUrl: 'https://flagcdn.com/w80/jp.png', 
    destination: 'Japan',
    color: '#e86a9e',
    glow: 'rgba(232,106,158,0.18)',
    desc: "JLPT N3 is the gateway to Japan's top universities. Start at zero and reach exam-ready fast.",
    batches: [
      { level: 'N5 → N4', duration: '4 Months', mode: 'Online', type: 'Immersion', fullFee: '₹29,682', monthly: '₹9,894', tag: 'Intermediate' },
      { level: 'N5 → N3', duration: '6 Months', mode: 'Online', type: 'Immersion', fullFee: '₹58,675', monthly: '₹9,779', tag: 'Advance' },
    ],
  },
]

export default function Programs() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)

  // FIXED OBSERVER: Now properly re-runs when 'active' tab changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    const timer = setTimeout(() => {
      ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 50)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [active])

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

        {/* Partnership banner */}
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

        {/* Language tabs */}
        <div className="programs__tabs reveal">
          {programs.map((p, i) => (
            <button
              key={p.lang}
              className={`programs__tab ${active === i ? 'programs__tab--active' : ''}`}
              onClick={() => setActive(i)}
              style={active === i ? { '--tab-color': p.color } : {}}
            >
              {/* IMAGE FLAG INSTEAD OF TEXT */}
              <img src={p.flagUrl} alt={p.lang} className="tab-flag-img" />
              <span>{p.lang}</span>
            </button>
          ))}
        </div>

        {/* Program panel */}
        <div
          className="programs__panel reveal"
          key={active}
          style={{ '--panel-glow': prog.glow, '--panel-color': prog.color }}
        >
          {/* Left: overview */}
          <div className="programs__panel-left">
            <div className="programs__panel-header">
              {/* BIG IMAGE FLAG INSTEAD OF TEXT */}
              <img src={prog.flagUrl} alt={prog.lang} className="programs__flag-img" />
              <div>
                <h3 className="programs__lang-title">{prog.lang} Immersion</h3>
                <p className="programs__destination">📍 {prog.destination}</p>
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

          {/* Right: fee cards */}
          <div className="programs__panel-right">
            {prog.batches.map(b => (
              <div key={b.level} className="batch-card">
                {/* Card header */}
                <div className="batch-card__header">
                  <div className="batch-card__top">
                    <span className="batch-card__tag">{b.tag}</span>
                    <span className="batch-card__level">
                      {/* SMALL IMAGE FLAG INSTEAD OF TEXT */}
                      <img src={prog.flagUrl} alt="" className="batch-flag-img" /> 
                      {b.level}
                    </span>
                  </div>
                </div>

                {/* Meta row */}
                <div className="batch-card__meta">
                  <div className="batch-meta-pill">
                    <span className="batch-meta-pill__icon">⏱</span>
                    <span>{b.duration}</span>
                  </div>
                  <div className="batch-meta-pill">
                    <span className="batch-meta-pill__icon">💻</span>
                    <span>{b.mode}</span>
                  </div>
                  <div className="batch-meta-pill">
                    <span className="batch-meta-pill__icon">🎯</span>
                    <span>{b.type}</span>
                  </div>
                </div>

                {/* Fee section */}
                <div className="batch-card__fees">
                  <div className="batch-fee batch-fee--full">
                    <span className="batch-fee__label">Full Fee</span>
                    <span className="batch-fee__amount">{b.fullFee}</span>
                  </div>
                  <div className="batch-fee-divider" />
                  <div className="batch-fee batch-fee--emi">
                    <span className="batch-fee__label">Monthly EMI</span>
                    <span className="batch-fee__amount batch-fee__amount--emi">{b.monthly}<span className="batch-fee__mo">/mo</span></span>
                  </div>
                </div>

                <a href="#enquire" className="batch-card__cta">Apply for this batch →</a>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMPORTANT FAQ BOX ── */}
        <div className="programs__faq reveal">
          <div className="programs__faq-icon">💡</div>
          <div className="programs__faq-content">
            <h4 className="programs__faq-q">Important Enrollment & Fee Information</h4>
            <p className="programs__faq-a">
              <strong>Fee Coverage:</strong> The program fee strictly covers language tuition and is non-refundable. Study abroad counseling, university admissions, and visa guidance are provided as separate services. <br/>
              <strong>Batch Sizes:</strong> To guarantee personalized attention, batches require a minimum of 5 students to commence and are strictly capped at 10 students.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}