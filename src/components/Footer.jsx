import './Footer.css'
import ismlLogo from '../assets/isml-logo.webp'
import slLogo from '../assets/success-learning-logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Brand — ISML primary */}
        <div className="footer__brand">
          <div className="footer__logos">
            {/* ISML */}
            <div className="footer__logo-isml-wrap">
              <img src={ismlLogo} alt="ISML" className="footer__logo-isml" />
            </div>
            <div className="footer__logo-brand-text">
              <span className="footer__logo-name">ISML</span>
            </div>
          </div>
          <p className="footer__tagline">
            India's premier immersion language learning institute.<br />
            Helping students master French, German &amp; Japanese<br />
            for study abroad success.
          </p>
          <div className="footer__contact">
            <a href="tel:+917338880186" className="footer__contact-link">📞 +91-7338-880186</a>
            <a href="mailto:enquiry.isml@gmail.com" className="footer__contact-link">✉️enquiry.isml@gmail.com</a>
          </div>

          {/* Success Learning partner card */}
          <div className="footer__partner-card">
            <p className="footer__partner-label">Study Abroad Partner</p>
            <div className="footer__partner-sl">
              <div className="footer__partner-sl-logo">
                <img src={slLogo} alt="Success Learning" />
              </div>
              <p className="footer__partner-sl-desc">
                University admissions &amp; visa guidance
              </p>
            </div>
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
          <p className="footer__connect-text">Talk to our counselor directly:</p>
          <div className="footer__expert-btns">
            <a href="tel:+917338880186" className="footer__expert-btn footer__expert-btn--call">
              📞 Call Now
            </a>
            <a href="https://wa.me/917338880186" target="_blank" rel="noreferrer"
              className="footer__expert-btn footer__expert-btn--wa">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} IYPAN Educational Centre Private Limited- All Rights Reserved.</p>
          <p style={{ color: 'var(--purple-400)', fontSize: '0.75rem' }}>
            In partnership with Success Learning · Study Abroad Counseling
          </p>
        </div>
      </div>
    </footer>
  )
}
