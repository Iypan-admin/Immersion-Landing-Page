import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      {/* Background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Grid lines */}
      <div className="hero__grid" />

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="badge animate-fade-up delay-1">
            <span>✦</span> Immersion Language Programs
          </div>

          <h1 className="hero__title animate-fade-up delay-2">
            Speak the Language of<br />
            <span className="hero__title-highlight">Your Dreams</span>
          </h1>

          <p className="hero__desc animate-fade-up delay-3">
            Master French, German, or Japanese with our expert-led immersion
            programs — specifically designed to get you study-abroad ready.
          </p>

          {/* Language pills */}
          <div className="hero__langs animate-fade-up delay-4">
            {[
              { flag: '🇫🇷', lang: 'French',  levels: 'A1 → B2' },
              { flag: '🇩🇪', lang: 'German',  levels: 'A1 → B2' },
              { flag: '🇯🇵', lang: 'Japanese', levels: 'N5 → N3' },
            ].map(l => (
              <div key={l.lang} className="lang-pill">
                <span className="lang-pill__flag">{l.flag}</span>
                <span className="lang-pill__name">{l.lang}</span>
                <span className="lang-pill__level">{l.levels}</span>
              </div>
            ))}
          </div>

          <div className="hero__ctas animate-fade-up delay-5">
            <a href="#enquire" className="btn btn--primary">
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#programs" className="btn btn--ghost">
              Explore Programs
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats animate-fade-up delay-6">
            {[
              { n: '500+', label: 'Students Placed' },
              { n: '3',    label: 'Languages' },
              { n: '98%',  label: 'Success Rate' },
              { n: '6',    label: 'Program Levels' },
            ].map(s => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-num">{s.n}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="hero__visual animate-fade-in delay-3">
          <div className="hero__card-stack">
            <div className="dest-card dest-card--back">
              <span className="dest-card__flag">🇩🇪</span>
              <span className="dest-card__city">Berlin</span>
              <span className="dest-card__level">B2 German</span>
            </div>
            <div className="dest-card dest-card--mid">
              <span className="dest-card__flag">🇫🇷</span>
              <span className="dest-card__city">Paris</span>
              <span className="dest-card__level">B1 French</span>
            </div>
            <div className="dest-card dest-card--front">
              <span className="dest-card__flag">🇯🇵</span>
              <span className="dest-card__city">Tokyo</span>
              <span className="dest-card__level">N3 Japanese</span>
              <div className="dest-card__progress">
                <span>Progress</span>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{width:'72%'}} />
                </div>
                <span>72%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="scroll-mouse">
          <div className="scroll-mouse__dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
