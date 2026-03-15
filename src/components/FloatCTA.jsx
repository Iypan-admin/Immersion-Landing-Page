import { useState, useEffect } from 'react'
import './FloatCTA.css'

export default function FloatCTA() {
  const [visible, setVisible]     = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  return (
    <div className={`float-cta ${visible ? 'float-cta--visible' : ''}`}>
      {/* Close */}
      <button className="float-cta__close" onClick={handleDismiss} aria-label="Close">×</button>

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
        <a href="tel:+91XXXXXXXXXX" className="float-cta__btn float-cta__btn--call">
          <span className="float-cta__btn-icon">📞</span>
          <span>Call an Expert</span>
        </a>
        <a
          href="https://wa.me/91XXXXXXXXXX"
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
