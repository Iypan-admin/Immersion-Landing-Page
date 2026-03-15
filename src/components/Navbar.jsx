import { useState, useEffect } from 'react'
import './Navbar.css'
import ismlLogo from '../assets/isml-logo.webp'

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

        {/* ISML logo + name only */}
        <a href="#" className="navbar__logo">
          <div className="navbar__logo-isml-wrap">
            <img src={ismlLogo} alt="ISML" className="navbar__logo-isml" />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">ISML</span>
            <span className="navbar__logo-sub">Foundation</span>
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
