import { useState, useEffect, useRef } from 'react'
import './FloatCTA.css'

export default function FloatCTA() {
  const [scrolled,   setScrolled]   = useState(false)  // user scrolled > 300px
  const [dismissed,  setDismissed]  = useState(false)  // user clicked X
  const [footerVisible, setFooterVisible] = useState(false) // footer in view

  // ── Show after 300px scroll ──
  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setScrolled(window.scrollY > 250)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  // ── Watch footer visibility via IntersectionObserver ──
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      // Trigger as soon as any part of the footer enters the viewport
      { threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  // Visible only when: scrolled past threshold AND not dismissed AND footer not in view
  const visible = scrolled && !dismissed && !footerVisible

  const handleDismiss = () => {
    setDismissed(true)
  }

  return (
    <div className={`float-cta ${visible ? 'float-cta--visible' : ''}`}>
      {/* Close button */}

      {/* Header */}
      <div className="float-cta__body">
        <div className="float-cta__icon">🎓</div>
        <div className="float-cta__text">
          <p className="float-cta__title">Talk to an Expert</p>
          <p className="float-cta__sub">Free counseling — no commitment needed</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="float-cta__actions">
        <a href="tel:+917338880186" className="float-cta__btn float-cta__btn--call">
          <span className="float-cta__btn-icon">📞</span>
          <span>Call an Expert</span>
        </a>
        <a
          href="https://wa.me/917338880186"
          target="_blank"
          rel="noreferrer"
          className="float-cta__btn float-cta__btn--wa"
        >
          <span className="float-cta__btn-icon">💬</span>
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
