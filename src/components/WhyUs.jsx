import { useEffect, useRef } from 'react'
import './WhyUs.css'

const steps = [
  {
    num: '01',
    icon: '🔍',
    title: 'Research & Eligibility',
    desc: 'Choose the right course, university, and country based on your academic profile and career goals.',
    color: '#4f6ef7',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Application Preparation',
    desc: 'Prepare essential documents: SOP, LORs, transcripts, CV, and passport copy — polished to perfection.',
    color: '#a68fd4',
  },
  {
    num: '03',
    icon: '🎓',
    title: 'Admission & Funding',
    desc: 'Submit applications, receive offer letters, and explore scholarships or education loan options.',
    color: '#e8c96a',
  },
  {
    num: '04',
    icon: '✈️',
    title: 'Visa & Travel Support',
    desc: 'Complete visa processing and get end-to-end guidance for accommodation and travel logistics.',
    color: '#6ae8c9',
  },
]

const reasons = [
  { icon: '🎓', title: 'Expert Instructors',    desc: 'Certified language experts with real study-abroad experience.' },
  { icon: '⚡', title: 'Fast-Track Results',     desc: 'Reach your required language level in months with intensive immersion.' },
  { icon: '🗺️', title: 'Abroad-Specific Prep',  desc: 'Curriculum tailored to admission requirements of target countries.' },
  { icon: '🤝', title: 'Personal Counseling',    desc: 'One-on-one guidance from Poornima Mam — your dedicated advisor.' },
  { icon: '📱', title: 'Live Online Classes',    desc: 'Join from anywhere. All sessions are live, interactive, and recorded.' },
  { icon: '🏆', title: 'Proven Track Record',    desc: '500+ students placed in universities across Europe & Japan.' },
]

export default function WhyUs() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section why-us" id="why-us" ref={ref}>
      <div className="container">

        {/* ── Section header ── */}
        <div className="text-center">
          <div className="badge reveal">✦ Study Abroad Guidance</div>
          <h2 className="section-title reveal">
            Your Study Abroad<br /><span>Journey</span>
          </h2>
          <p className="section-subtitle reveal">
            From choosing a university to landing your visa — we guide you every step of the way.
          </p>
        </div>

        {/* ── 4-step journey cards ── */}
        <div className="whyus__steps">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`whyus__step reveal delay-${i + 1}`}
              style={{ '--step-color': s.color }}
            >
              <div className="whyus__step-num">{s.num}</div>
              <div className="whyus__step-icon">{s.icon}</div>
              <h3 className="whyus__step-title">{s.title}</h3>
              <p className="whyus__step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="whyus__step-arrow">→</div>}
            </div>
          ))}
        </div>

        {/* ── Divider label ── */}
        <div className="whyus__divider reveal">
          <span>Why Choose ISML</span>
        </div>

        {/* ── 6 reason cards (2-col mobile, 3-col desktop) ── */}
        <div className="whyus__grid">
          {reasons.map((r, i) => (
            <div key={r.title} className={`whyus__card reveal delay-${(i % 3) + 1}`}>
              <div className="whyus__icon">{r.icon}</div>
              <h3 className="whyus__title">{r.title}</h3>
              <p className="whyus__desc">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA banner ── */}
        <div className="whyus__banner reveal">
          <div className="whyus__banner-content">
            <h3>Ready to Begin Your Language Journey?</h3>
            <p>Talk to Poornima Mam — our expert counselor will guide you to the perfect program.</p>
          </div>
          <a href="#enquire" className="btn btn--primary">
            Get Free Counseling
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  )
}
