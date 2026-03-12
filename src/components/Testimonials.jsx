import { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    country: 'Germany 🇩🇪',
    level: 'German B2',
    uni: 'TU Munich',
    avatar: 'PS',
    color: '#e8c96a',
    text: "I joined the German A1→B2 track with zero background. In 9 months, I went from not knowing a single word to passing my B2 exam and getting admission to TU Munich. The immersion method actually works!",
  },
  {
    name: 'Arjun Menon',
    country: 'France 🇫🇷',
    level: 'French B1',
    uni: 'Sciences Po Paris',
    avatar: 'AM',
    color: '#4f6ef7',
    text: "The live sessions with Success Learning made all the difference. Poornima Mam personally guided me on which French level I needed and which program to apply for. Got into Sciences Po — dream come true.",
  },
  {
    name: 'Sneha Reddy',
    country: 'Japan 🇯🇵',
    level: 'JLPT N3',
    uni: 'Waseda University',
    avatar: 'SR',
    color: '#e86a9e',
    text: "Japanese seemed impossible at first. But the N5→N3 track at Success Learning broke it down perfectly. The immersion style made me think in Japanese, not translate. Cleared N3 in my first attempt!",
  },
  {
    name: 'Karthik Iyer',
    country: 'Germany 🇩🇪',
    level: 'German B1',
    uni: 'RWTH Aachen',
    avatar: 'KI',
    color: '#6ae8c9',
    text: "What sets Success Learning apart is the counseling. They didn't just teach me German — they told me exactly which universities accept B1, helped with my SOP, and even prepped me for the visa interview.",
  },
  {
    name: 'Divya Nair',
    country: 'France 🇫🇷',
    level: 'French B2',
    uni: 'Université de Lyon',
    avatar: 'DN',
    color: '#c96ae8',
    text: "I was skeptical about online immersion learning. But the live interactive classes with native-level teachers completely changed how I think about learning. Reached B2 French in 9 months. Merci beaucoup!",
  },
  {
    name: 'Rahul Verma',
    country: 'Japan 🇯🇵',
    level: 'JLPT N4',
    uni: 'Osaka University',
    avatar: 'RV',
    color: '#e8a06a',
    text: "The structured pace of the N5→N4 track was perfect for me alongside my engineering degree. Could do live classes in the evening, review recordings when busy. Got into Osaka University's research program!",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4200)
    return () => clearInterval(t)
  }, [auto])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <div className="text-center">
          <div className="badge reveal">✦ Student Stories</div>
          <h2 className="section-title reveal">
            From Classrooms to<br /><span>Campuses Abroad</span>
          </h2>
          <p className="section-subtitle reveal">
            Real students. Real results. Real universities.
          </p>
        </div>

        {/* Main testimonial */}
        <div className="testi__main reveal">
          <div className="testi__card" key={active}>
            <div className="testi__quote-icon">"</div>
            <p className="testi__text">{testimonials[active].text}</p>
            <div className="testi__author">
              <div
                className="testi__avatar"
                style={{ background: `linear-gradient(135deg, ${testimonials[active].color}33, ${testimonials[active].color}66)`,
                          borderColor: testimonials[active].color + '55' }}
              >
                {testimonials[active].avatar}
              </div>
              <div>
                <p className="testi__name">{testimonials[active].name}</p>
                <p className="testi__meta">{testimonials[active].level} · {testimonials[active].uni}</p>
                <p className="testi__country">{testimonials[active].country}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="testi__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi__dot ${active === i ? 'testi__dot--active' : ''}`}
                onClick={() => { setActive(i); setAuto(false) }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="testi__thumbs reveal">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              className={`testi__thumb ${active === i ? 'testi__thumb--active' : ''}`}
              onClick={() => { setActive(i); setAuto(false) }}
            >
              <div className="testi__thumb-avatar" style={{ background: t.color + '33', borderColor: t.color + '66' }}>
                {t.avatar}
              </div>
              <span className="testi__thumb-name">{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
