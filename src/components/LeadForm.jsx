import { useState, useEffect, useRef } from 'react'
import './LeadForm.css'

const LANGUAGES = ['French', 'German', 'Japanese']
const LEVELS = {
  French:   ['A1 → B1 (Intermediate)', 'A1 → B2 (Advance)'],
  German:   ['A1 → B1 (Intermediate)', 'A1 → B2 (Advance)'],
  Japanese: ['N5 → N4 (Intermediate)', 'N5 → N3 (Advance)'],
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000' || 'https://immersion-landing-page-backend-production.up.railway.app/'

async function submitLead(data) {
  const res = await fetch(`${BACKEND_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error('Server error:', res.status, err)
    throw new Error(err || 'Failed')
  }
  return res.json()
}

const trustSignals = [
  { icon: '🆓', label: 'Free counseling session' },
  { icon: '⚡', label: 'Response within 24 hours' },
  { icon: '🎯', label: 'Personalized recommendation' },
  { icon: '🔒', label: 'Your info is 100% private' },
]

export default function LeadForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', language: '', level: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const ref = useRef(null)

  // IntersectionObserver — re-runs when status changes (fixes re-mount reveal)
  useEffect(() => {
    if (status === 'success') return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    const timer = setTimeout(() => {
      ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 50)
    return () => { observer.disconnect(); clearTimeout(timer) }
  }, [status])

  // Scroll to section on success
  useEffect(() => {
    if (status !== 'success') return
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [status])

  const validate = () => {
    const e = {}
    if (!form.name.trim())                   e.name     = 'Full name is required'
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email    = 'Enter a valid email'
    if (!form.phone.match(/^\d{10}$/))       e.phone    = 'Enter a 10-digit phone number'
    if (!form.language)                      e.language = 'Please select a language'
    if (!form.level)                         e.level    = 'Please select a level'
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

  // ── SUCCESS STATE ────────────────────────────────────────────
  if (status === 'success') {
    return (
      <section className="section lead-form" id="enquire" ref={ref}>
        <div className="container">
          <div className="lf__success">
            <div className="lf__success-icon">🎉</div>
            <h3 className="lf__success-title">
              You're All Set, {form.name.split(' ')[0]}!
            </h3>
            <p className="lf__success-desc">
              We've received your enquiry for <strong>{form.language}</strong>.<br />
              Poornima Mam will reach out within <strong>24 hours</strong>.
            </p>

            {/* Trust signals grid */}
            <div className="lf__trust-grid">
              {trustSignals.map(t => (
                <div key={t.label} className="lf__trust-card">
                  <span className="lf__trust-icon">{t.icon}</span>
                  <span className="lf__trust-label">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="lf__success-divider">
              <span>Or connect right now</span>
            </div>

            <div className="lf__success-btns">
              <a href="tel:+917338880186" className="expert-btn expert-btn--call">
                <span className="expert-btn__icon">📞</span>
                <div className="expert-btn__text">
                  <span className="expert-btn__label">Call Our Expert</span>
                  <span className="expert-btn__sub">Poornima Mam</span>
                </div>
              </a>
              <a
                href="https://wa.me/917338880186"
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
              className="lf__reset"
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

  // ── FORM STATE ───────────────────────────────────────────────
  return (
    <section className="section lead-form" id="enquire" ref={ref}>
      <div className="lead-form__glow" aria-hidden="true" />

      <div className="container">
        <div className="lf__wrap">

          {/* Header */}
          <div className="lf__header reveal">
            <div className="badge">✦ Free Counseling</div>
            <h2 className="section-title">
              Start Your Journey<br /><span>Today</span>
            </h2>
          </div>

          {/* Form card */}
          <div className="lf__form-card reveal">
            <div className="lf__form-head">
              <h3 className="lf__form-title">Enquiry Form</h3>
              <p className="lf__form-sub">Fill in your details and our expert counselor will get back to you
              with a personalized program recommendation.</p>
            </div>

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
              className="form-submit"
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

          {/* Trust pills */}
          <div className="lf__trust-row reveal">
            {trustSignals.map(t => (
              <div key={t.label} className="lf__trust-pill">
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
