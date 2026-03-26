import { useState, useEffect, useRef, useCallback } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Mathurabashene',
    language: 'German B2 · Universität zu Kiel',
    avatar: 'MB',
    color: '#4fc4f7', // A nice bright blue
    text: "I'm taking German classes here, and the coach Mr. Arjun is incredibly supportive and approachable. My coach is particularly helpful, clarifying my doubts patiently and no matter how many times I ask. I had a great learning session. Thank you!",
  },
  {
    name: 'Cris Joy',
    language: 'German B2 · Hochschule Bonn-Rhein-Sieg',
    avatar: 'CJ',
    color: '#c96ae8',
    text: "Spending six months in the German class has been undoubtedly the best experience of my life. Even though Arjun sir was quite young, he was extremely knowledgeable and astonishingly patient with us. He made it so easy and enjoyable to learn. The teaching method at this institute was also very effective, and they explained even the hardest grammar rules in a way that you learned it as a five-year-old. The class times were very flexible, scheduled around our free time, which was nice and easy. Also, I could not have asked for or imagined better classmates. Everyone was super helpful, friendly and fun. I would say it was worth every penny, and I do highly recommend this to anyone wanting to, or consider, learning German in a positive and warm environment!",
  },
  {
    name: 'Sumitha Magesh',
    language: 'French Conversation',
    avatar: 'SM',
    color: '#4f6ef7',
    text: "I thoroughly enjoyed my French conversation classes with ISML. My trainer always came prepared with interesting topics that kept our 2-hour sessions engaging. He was very patient and explained things clearly in English when needed, which really helped. I learned a lot and would definitely recommend ISML to anyone looking to improve their French skills!",
  },
  {
    name: 'Anugayathiri',
    language: 'German',
    avatar: 'AN',
    color: '#e8c96a',
    text: "I had an excellent experience learning German here. The instructors were knowledgeable and patient, and they made each lesson engaging. I gained both confidence and strong language skills in a supportive, interactive environment that helped me progress quickly. If you're looking to learn a new language effectively, give this place a try!",
  },
  {
    name: 'Nithish Raghavendar T K',
    language: 'Japanese · JLPT Prep',
    avatar: 'NR',
    color: '#e86a9e',
    text: "I had a great experience at ISML. The teachers are very helpful, and learning from native Japanese speakers made the process more natural. The lessons were well-planned and focused on speaking, listening, and real-life situations. The study materials and practice sessions were very effective. The training truly helped me prepare for the JLPT exams. Overall, it's a great place to learn Japanese — I highly recommend it!",
  },
  {
    name: 'Swetha Venkat',
    language: 'Foreign Language',
    avatar: 'SV',
    color: '#6ae8c9',
    text: "I joined ISML, and trust me — this is the best institute to learn a foreign language. My trainer, Mr. Claude, is the best teacher because he has so much patience. Even if we didn't understand the topic well, he would reteach it without hesitation. The best part about this institution is their constant support — no matter what the doubt is, they always take time to clarify. I'm truly happy to have joined.",
  },
  {
    name: 'Sheik Mohamed',
    language: 'German A1',
    avatar: 'SM',
    color: '#e8a06a',
    text: "Great place to learn languages! The instructors are knowledgeable, patient, and passionate. The course is well-organized, and the friendly staff ensures a smooth experience. Thanks to Mr. Arjun (Deutsch) and Mr. Ramesh for coordinating!",
  },
  {
    name: 'Sridevi',
    language: 'German · Online',
    avatar: 'SR',
    color: '#6ae8a0',
    text: "Hi, this is Sridevi from Madurai. I attended German classes online at ISML. All the tutors explained the lessons very well. The notes they provided were very clear and helpful, and they are still useful for me. They supported us a lot by helping us practice exercises, speak in German, and correct our mistakes with clear explanations. Our tutor, Neenu ma'am, was a very supportive person. She explained the grammar very clearly and made it easy for us to understand. Thank you to ISML for giving us this wonderful opportunity.",
  },
  {
    name: 'Subbulakshmi Venkatesan',
    language: 'German · Online',
    avatar: 'SB',
    color: '#f7a64f',
    text: "I attended the online German course conducted by ISML. The classes were well organized and easy to understand. The trainers explained the topics clearly and were very supportive throughout the course. For every chapter, they provided detailed notes in PDF format, which were very useful for revision and reference. I would like to give a special thanks to our tutors Dennis Sir and Neenu Ma'am for their guidance, patience, and continuous support during the course. Overall, the course was very helpful for improving my German language skills.",
  },
]

const counselors = [
  {
    initials: 'PR',
    name: 'Purnima Rajaram',
    role: 'Senior Language Trainer',
    org: 'Indian School for Modern Languages',
    color: '#7c5cbf',
    badge: 'Since 2014',
    tags: ['French', 'German', 'DELF Prep', 'Goethe Exam'],
    bio: "At ISML, learning a language is about creating new opportunities. Since 2014, our programs have helped thousands of students build real speaking confidence and prepare for international exams like DELF and Goethe — through a practical, immersive teaching approach.",
  },
  {
    initials: 'RG',
    name: 'Ramesh Ganesan',
    role: 'Senior Global Education Advisor',
    org: 'Success Learning',
    color: '#4f6ef7',
    badge: 'Expert Counselor', 
    tags: ['University Selection', 'Visa & Loans', 'SOP Support'],
    bio: "Ramesh provides comprehensive guidance for Undergraduate, Postgraduate, and PhD programs. From university selection and SOP documentation to visa, loan, and accommodation assistance, he ensures students confidently achieve their global education dreams.",
  },
]

export default function Testimonials() {
  const [active, setActive]   = useState(0)
  const [auto, setAuto]       = useState(true)
  const [animKey, setAnimKey] = useState(0)
  const ref = useRef(null)

  const trackRef    = useRef(null)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const isDragging  = useRef(false)
  const dragDelta   = useRef(0)

  // Auto-cycle
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
      setAnimKey(k => k + 1)
    }, 4500)
    return () => clearInterval(t)
  }, [auto])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (i) => { setActive(i); setAnimKey(k => k + 1); setAuto(false) }

  // Keep track in sync
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      trackRef.current.style.transform  = `translateX(-${active * 100}%)`
    }
  }, [active])

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current  = true
    dragDelta.current   = 0
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dragDelta.current) < 5) return
    dragDelta.current = dx
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(${-active * 100}% + ${dx}px))`
    }
  }, [active])

  const onTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const threshold = 50
    if (dragDelta.current < -threshold && active < testimonials.length - 1) {
      goTo(active + 1)
    } else if (dragDelta.current > threshold && active > 0) {
      goTo(active - 1)
    } else {
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        trackRef.current.style.transform  = `translateX(-${active * 100}%)`
      }
    }
  }, [active])

  const t = testimonials[active]

  return (
    <section className="section testimonials" id="testimonials" ref={ref}>
      <div className="container">

        {/* ── Section header ── */}
        <div className="text-center">
          <div className="badge reveal">✦ Student Stories</div>
          <h2 className="section-title reveal">
            Real Students,<br /><span>Real Results</span>
          </h2>
          <p className="section-subtitle reveal">
            Hear directly from students who transformed their language journey with ISML.
          </p>
        </div>

        {/* ── DESKTOP: single animated card ── */}
        <div className="testi__main reveal">
          <div className="testi__card" key={animKey}>
            <div className="testi__quote-icon">"</div>
            <p className="testi__text">{t.text}</p>
            <div className="testi__author">
              <div
                className="testi__avatar"
                style={{
                  background: `linear-gradient(135deg, ${t.color}33, ${t.color}66)`,
                  borderColor: t.color + '55'
                }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="testi__name">{t.name}</p>
                <p className="testi__meta">{t.language}</p>
                <p className="testi__country">ISML Student ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>

          <div className="testi__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi__dot ${active === i ? 'testi__dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE: swipe slider ── */}
        <div
          className="testi__slider reveal"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="testi__track" ref={trackRef}>
            {testimonials.map((item, i) => (
              <div className="testi__slide" key={i}>
                <div className="testi__slide-card">
                  <span className="testi__slide-quote">"</span>
                  <p className="testi__slide-text">{item.text}</p>
                  <div className="testi__slide-author">
                    <div
                      className="testi__slide-avatar"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)`,
                        borderColor: item.color + '55'
                      }}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <p className="testi__slide-name">{item.name}</p>
                      <p className="testi__slide-meta">{item.language}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="testi__slider-dots reveal">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testi__slider-dot ${active === i ? 'testi__slider-dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Desktop thumbnails */}
        <div className="testi__thumbs reveal">
          {testimonials.map((item, i) => (
            <button
              key={item.name + i}
              className={`testi__thumb ${active === i ? 'testi__thumb--active' : ''}`}
              onClick={() => goTo(i)}
            >
              <div
                className="testi__thumb-avatar"
                style={{ background: item.color + '33', borderColor: item.color + '66' }}
              >
                {item.avatar}
              </div>
              <span className="testi__thumb-name">{item.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            COUNSELOR PROFILE CARDS
        ══════════════════════════════════════════ */}
        <div className="testi__counselors-wrap reveal">
          {/* Section divider label */}
          <div className="testi__counselors-divider">
            <span>Meet Your Expert Counselors</span>
          </div>

          <div className="testi__counselors-grid">
            {counselors.map(c => (
              <div
                key={c.name}
                className="testi__counselor-card"
                style={{ '--c-color': c.color }}
              >
                {/* Top gradient accent bar */}
                <div
                  className="testi__counselor-bar"
                  style={{ background: `linear-gradient(90deg, ${c.color}cc, ${c.color}33, transparent)` }}
                />

                {/* Header: avatar + name + status */}
                <div className="testi__counselor-header">
                  <div
                    className="testi__counselor-avatar"
                    style={{
                      background: `linear-gradient(135deg, ${c.color}44, ${c.color}88)`,
                      borderColor: c.color + '60',
                      boxShadow: `0 0 0 4px ${c.color}18`,
                    }}
                  >
                    {c.initials}
                  </div>
                  <div className="testi__counselor-identity">
                    <p className="testi__counselor-name">{c.name}</p>
                    <p className="testi__counselor-role">
                      {c.role}
                      <span className="testi__counselor-org" style={{ color: c.color }}>
                        {' '}· {c.org}
                      </span>
                    </p>
                    <div className="testi__counselor-status">
                      <span
                        className="testi__counselor-dot"
                        style={{ background: c.color }}
                      />
                      <span className="testi__counselor-badge-text">{c.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="testi__counselor-bio">{c.bio}</p>

                {/* Expertise tags */}
                <div className="testi__counselor-tags">
                  {c.tags.map(tag => (
                    <span
                      key={tag}
                      className="testi__counselor-tag"
                      style={{ borderColor: c.color + '44', color: c.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA link */}
                <a href="#enquire" className="testi__counselor-cta">
                  <span>Talk to {c.name.split(' ')[0]}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
