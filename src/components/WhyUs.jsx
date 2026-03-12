import { useEffect, useRef } from 'react'
import './WhyUs.css'

const reasons = [
  { icon: '🎓', title: 'Expert Instructors',       desc: 'Taught by certified language experts with real study-abroad experience.' },
  { icon: '⚡', title: 'Fast-Track Results',        desc: 'Reach your required language level in months with intensive immersion.' },
  { icon: '🗺️', title: 'Abroad-Specific Prep',    desc: 'Tailored curriculum based on admission requirements of target countries.' },
  { icon: '🤝', title: 'Personal Counseling',       desc: 'One-on-one guidance from Poornima Mam — your dedicated study advisor.' },
  { icon: '📱', title: 'Live Online Classes',       desc: 'Join from anywhere. All sessions are live, interactive, and recorded.' },
  { icon: '🏆', title: 'Proven Track Record',       desc: '500+ students successfully placed in universities across Europe & Japan.' },
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
        <div className="text-center">
          <div className="badge reveal">✦ Why Success Learning</div>
          <h2 className="section-title reveal">
            The Smarter Path<br /><span>to Study Abroad</span>
          </h2>
          <p className="section-subtitle reveal">
            We don't just teach language — we prepare you completely for life abroad.
          </p>
        </div>

        <div className="whyus__grid">
          {reasons.map((r, i) => (
            <div key={r.title} className={`whyus__card reveal delay-${(i % 3) + 1}`}>
              <div className="whyus__icon">{r.icon}</div>
              <h3 className="whyus__title">{r.title}</h3>
              <p className="whyus__desc">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
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
