import { useState, useEffect } from 'react'
import './FloatCTA.css'

export default function FloatCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Show after scrolling 300px, hide if user dismissed
  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const handleCTA = () => {
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  return (
    <div className={`float-cta ${visible ? 'float-cta--visible' : ''}`}>
      <button className="float-cta__close" onClick={handleDismiss} aria-label="Close">×</button>
      <div className="float-cta__body">
        <div className="float-cta__icon">🎓</div>
        <div className="float-cta__text">
          <p className="float-cta__title">Free Language Counseling</p>
          <p className="float-cta__sub">Talk to our expert — no commitment needed</p>
        </div>
      </div>
      <button className="float-cta__btn" onClick={handleCTA}>
        Get Free Guidance →
      </button>
    </div>
  )
}