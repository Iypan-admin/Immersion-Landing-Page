import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <a href="#" className="navbar__logo footer__logo">
            <span style={{color:'var(--gold)', fontSize:'1.1rem'}}>✦</span>
            <span style={{fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:700, color:'var(--white)'}}>
              Success<span style={{color:'var(--gold)'}}>Learning</span>
            </span>
          </a>
          <p className="footer__tagline">
            Helping students reach their language goals<br />
            and study abroad with confidence.
          </p>
          <div className="footer__contact">
            <a href="tel:+91XXXXXXXXXX" className="footer__contact-link">📞 +91-XXXX-XXXXXX</a>
            <a href="mailto:info@successlearning.in" className="footer__contact-link">✉️ info@successlearning.in</a>
          </div>
        </div>

        {/* Programs */}
        <div className="footer__col">
          <h4 className="footer__col-title">Programs</h4>
          <ul className="footer__list">
            <li><a href="#programs">French A1 → B2</a></li>
            <li><a href="#programs">French A1 → B1</a></li>
            <li><a href="#programs">German A1 → B2</a></li>
            <li><a href="#programs">German A1 → B1</a></li>
            <li><a href="#programs">Japanese N5 → N3</a></li>
            <li><a href="#programs">Japanese N5 → N4</a></li>
          </ul>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__list">
            <li><a href="#about">About Immersion</a></li>
            <li><a href="#why-us">Why Choose Us</a></li>
            <li><a href="#testimonials">Student Stories</a></li>
            <li><a href="#enquire">Free Counseling</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="footer__col">
          <h4 className="footer__col-title">Connect</h4>
          <p className="footer__connect-text">Talk to Poornima Mam directly:</p>
          <div className="footer__expert-btns">
            <a href="tel:+91XXXXXXXXXX" className="footer__expert-btn footer__expert-btn--call">
              📞 Call Now
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="footer__expert-btn footer__expert-btn--wa">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Success Learning. All rights reserved.</p>
          <p style={{color:'var(--purple-600)', fontSize:'0.75rem'}}>
            Immersion Language Programs · Study Abroad Counseling
          </p>
        </div>
      </div>
    </footer>
  )
}
