import { useState, useEffect, useRef } from 'react'
import './LeadForm.css'

const LANGUAGES = ['French', 'German', 'Japanese']
const LEVELS = {
  French:   ['A1 → B2 (Complete)', 'A1 → B1 (Foundation)'],
  German:   ['A1 → B2 (Complete)', 'A1 → B1 (Foundation)'],
  Japanese: ['N5 → N3 (Advanced)',  'N5 → N4 (Foundation)'],
}

// ── Real API Call ──
async function submitLead(data) {
  // Uses your Railway backend URL if deployed, otherwise falls back to localhost for local testing
  const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const API_URL = `${baseURL}/api/leads`;
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  return response.json();
}

export default function LeadForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', language: '', level: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Scroll to section when success state appears
  useEffect(() => {
    if (status !== 'success') return
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [status])

  const validate = () => {
    const e = {}
    if (!form.name.trim())                    e.name     = 'Full name is required'
    if (!form.email.match(/^\S+@\S+\.\S+$/))  e.email    = 'Enter a valid email'
    if (!form.phone.match(/^\d{10}$/))        e.phone    = 'Enter a 10-digit phone number'
    if (!form.language)                       e.language = 'Please select a language'
    if (!form.level)                          e.level    = 'Please select a level'
    return e
  }

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val, ...(field === 'language' ? { level: '' } : {}) }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('loading')
    try {
      await submitLead(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // ── Success state (NO reveal class — always visible immediately) ──
  if (status === 'success') {
    return (
      <section className="section lead-form" id="enquire" ref={ref}>
        <div className="container">
          <div className="success-state">
            <div className="success-state__confetti">🎉</div>
            <h3 className="success-state__title">
              You're All Set, {form.name.split(' ')[0]}!
            </h3>
            <p className="success-state__desc">
              We've received your enquiry for <strong>{form.language}</strong>.<br />
              Poornima Mam will reach out within 24 hours.
            </p>

            <div className="success-divider">
              <span>OR connect with her right now</span>
            </div>

            <div className="success-state__btns">
              <a href="tel:+91XXXXXXXXXX" className="expert-btn expert-btn--call">
                <span className="expert-btn__icon">📞</span>
                <div className="expert-btn__text">
                  <span className="expert-btn__label">Call Our Expert</span>
                  <span className="expert-btn__sub">Poornima Mam</span>
                </div>
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="expert-btn expert-btn--whatsapp"
              >
                <span className="expert-btn__icon">💬</span>
                <div className="expert-btn__text">
                  <span className="expert-btn__label">Chat on WhatsApp</span>
                  <span className="expert-btn__sub">Usually replies in minutes</span>
                </div>
              </a>
            </div>

            <button
              className="success-state__reset"
              onClick={() => {
                setStatus('idle')
                setForm({ name: '', email: '', phone: '', language: '', level: '' })
              }}
            >
              ← Submit another enquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ── Form state ─────────────────────────────────────────────
  return (
    <section className="section lead-form" id="enquire" ref={ref}>
      <div className="container">
        <div className="lead-form__inner">
          {/* Left info */}
          <div className="lead-form__info">
            <div className="badge reveal">✦ Free Counseling</div>
            <h2 className="section-title reveal" style={{textAlign:'left', maxWidth: '420px'}}>
              Start Your Journey<br /><span>Today</span>
            </h2>
            <p className="reveal" style={{color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '32px'}}>
              Fill in your details and our expert counselor will get back to you
              with a personalized program recommendation.
            </p>

            <div className="lead-form__promises reveal">
              {[
                { icon: '🆓', text: 'Free counseling session' },
                { icon: '⚡', text: 'Response within 24 hours' },
                { icon: '🎯', text: 'Personalized program recommendation' },
                { icon: '🔒', text: 'Your info is 100% private' },
              ].map(p => (
                <div key={p.text} className="promise">
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Counselor card */}
            <div className="counselor-card reveal">
              <div className="counselor-card__avatar">PM</div>
              <div>
                <p className="counselor-card__name">Poornima Mam</p>
                <p className="counselor-card__role">Senior Language Counselor</p>
                <p className="counselor-card__note">✅ Available for free consultation</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lead-form__form-wrap reveal">
            <div className="lead-form__form">
              <h3 className="lead-form__form-title">Enquiry Form</h3>
              <p className="lead-form__form-sub">All fields are required</p>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Language</label>
                  <select
                    className={`form-select ${errors.language ? 'form-input--error' : ''}`}
                    value={form.language}
                    onChange={e => handleChange('language', e.target.value)}
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.language && <span className="form-error">{errors.language}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Level</label>
                  <select
                    className={`form-select ${errors.level ? 'form-input--error' : ''}`}
                    value={form.level}
                    onChange={e => handleChange('level', e.target.value)}
                    disabled={!form.language}
                  >
                    <option value="">{form.language ? 'Select level' : 'Pick language first'}</option>
                    {(LEVELS[form.language] || []).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.level && <span className="form-error">{errors.level}</span>}
                </div>
              </div>

              <button
                className={`form-submit ${status === 'loading' ? 'form-submit--loading' : ''}`}
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? <><span className="spinner" /> Submitting...</>
                  : <>Submit Enquiry <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                }
              </button>

              {status === 'error' && (
                <p className="form-api-error">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}