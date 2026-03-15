import { useState, useEffect } from 'react'
import './Navbar.css'
import ismlLogo from '../assets/isml-logo.webp'
import slLogo from '../assets/success-learning-logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Programs',     href: '#programs' },
    { label: 'Why Us',       href: '#why-us' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Enquire',      href: '#enquire' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        <a href="#" className="navbar__logo">
          {/* ISML — rectangular white bg, no circle crop */}
          <img src={ismlLogo} alt="ISML" className="navbar__logo-isml" />

          <div className="navbar__logo-divider" />

          {/* Success Learning — white bg wrapper so colours show */}
          <div className="navbar__logo-sl-wrap">
            <img src={slLogo} alt="Success Learning" className="navbar__logo-sl" />
          </div>
        </a>

        <ul className="navbar__links">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="navbar__link">{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#enquire" className="navbar__cta">Get Started</a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {links.map(l => (
          <a key={l.label} href={l.href} className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#enquire" className="navbar__cta navbar__cta--mobile"
          onClick={() => setMenuOpen(false)}>
          Get Started →
        </a>
      </div>
    </nav>
  )
}