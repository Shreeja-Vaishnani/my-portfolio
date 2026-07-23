import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

function Navigation({ dark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navigation">
      <Link className="brand" to="/">SV<span>.</span></Link>

      <div className={`nav-links${menuOpen ? ' open' : ''}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
      </div>

      <div className="nav-actions">
        <button
          className="icon-btn"
          aria-label="Toggle dark mode"
          onClick={toggleDark}
        >
          {dark ? '☀️' : '🌙'}
        </button>
        <button
          className="icon-btn hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}

function Home() {
  const [showInfo, setShowInfo] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <main className="home-page">
      <section className="intro-section">
        <p className="section-label">Available for opportunities</p>
        <h1>Shreeja Vaishnani</h1>
        <h2>Computer Engineering Student</h2>
        <div className="intro-actions">
          <Link to="/contact" className="btn-primary">Get in touch</Link>
          <Link to="/projects" className="btn-outline">View projects</Link>
        </div>
      </section>

      <section className="about-header">
        <div className="about-controls">
          <button onClick={() => setShowInfo(v => !v)}>
            {showInfo ? 'Hide About' : 'Show About'}
          </button>
          <div className="tooltip-wrap">
            <button
              className="btn-ghost"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ℹ️ About this section
            </button>
            {showTooltip && (
              <div className="tooltip" role="tooltip">
                Toggle to show or hide the About Me &amp; Skills section below.
              </div>
            )}
          </div>
        </div>
      </section>

      {showInfo && (
        <section className="info-section">
          <div className="info-col">
            <p className="section-label">Introduction</p>
            <h2>About Me</h2>
          </div>
          <div className="info-col">
            <p>
              Hi, I&apos;m a passionate Computer Engineering student with a strong
              interest in building modern web applications. I enjoy turning ideas
              into clean, functional products and am always eager to learn new
              technologies and collaborate on meaningful projects.
            </p>
          </div>

          <div className="info-col skills-label-col">
            <p className="section-label">What I Know</p>
            <h2>Skills</h2>
          </div>
          <div className="info-col">
            <ul className="skills-list">
              {['React', 'JavaScript', 'HTML & CSS', 'Python', 'Git', 'Vite'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

const PROJECTS = [
  {
    num: '01',
    title: 'Briefify — AI File Summarizer',
    badge: 'AI / Full-Stack',
    stack: ['JavaScript', 'Node.js', 'Express.js', 'Gemini API', 'Multer', 'pdf-parse'],
    bullets: [
      'Full-stack AI platform summarizing PDFs, images, and videos with customizable length and tone.',
      'Engineered a custom 4-key API rotation system to maximize free-tier limits and guarantee high availability.',
      'Interactive context-aware Q&A, history logs, and multi-format exports (PDF, TXT).',
    ],
  },
  {
    num: '02',
    title: 'MCQ Test Network — ESP32 Exam System',
    badge: 'IoT / Embedded',
    stack: ['ESP32', 'C++', 'SPIFFS', 'HTML', 'JavaScript'],
    bullets: [
      'Secure WiFi-based MCQ examination system using ESP32 — no internet dependency required.',
      'Local network platform: students log in via browser; admin panel manages students, questions, and results.',
      'Randomized questions, timed exams, one-time login, fullscreen monitoring, and auto-submission.',
      'SPIFFS storage for persistent exam data, questions, and results.',
    ],
  },
  {
    num: '03',
    title: 'Medi Care Pro — Healthcare Management',
    badge: 'Live Client Project',
    stack: ['Web', 'Healthcare', 'UI/UX'],
    bullets: [
      'Live production system built for a doctor client to manage patient records efficiently.',
      'Patient registration, OPD list management, medical record storage, and prescription tracking.',
      'Focused on clinical workflow, data organisation, and a simple accessible interface.',
    ],
  },
  {
    num: '04',
    title: 'Community Relief & NGO Management',
    badge: 'Full-Stack',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS', 'JWT', 'bcrypt'],
    bullets: [
      '4 role-based dashboards secured via JWT and bcrypt authentication.',
      'Normalised MySQL database with aggregate queries powering live admin metrics.',
      'RESTful APIs for donation tracking, relief workflows, and real-time volunteer task assignments.',
    ],
    github: 'https://github.com/Shreeja-Vaishnani/community-relief-and-NGO-Management-System',
  },
  {
    num: '05',
    title: 'Academic Event Management System',
    badge: 'Full-Stack',
    stack: ['React.js', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'JWT'],
    bullets: [
      'University event portal with 4-tier role-based access control and secure JWT authentication.',
      'Normalised 6-table PostgreSQL schema with RESTful CRUD APIs for complete event workflows.',
      'Automated student registration filtering based on academic eligibility with real-time notifications.',
    ],
    github: 'https://github.com/SBTechLab/Academic-Event-Management-System',
  },
];

function Projects() {
  const [active, setActive] = useState(null);

  return (
    <main className="content-page">
      <p className="section-label">Selected work</p>
      <h1>Projects</h1>
      <p className="page-intro">
        End-to-end applications spanning AI, IoT, healthcare, and community platforms —
        built with a focus on real-world impact and clean engineering.
      </p>
      <section className="project-list">
        {PROJECTS.map((p, i) => (
          <article
            className={`project-item${active === i ? ' expanded' : ''}`}
            key={p.num}
          >
            <button
              className="project-header"
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
            >
              <div className="project-header-left">
                <span className="project-number">{p.num}</span>
                <div>
                  <h2>{p.title}</h2>
                  <span className="project-badge">{p.badge}</span>
                </div>
              </div>
              <span className="project-chevron">{active === i ? '−' : '+'}</span>
            </button>

            {active === i && (
              <div className="project-body">
                <ul className="project-bullets">
                  {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="project-footer">
                  <div className="tag-list">
                    {p.stack.map(t => <span key={t}>{t}</span>)}
                  </div>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="github-link"
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

const MAX = 500;

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="content-page">
        <div className="success-card">
          <span className="success-icon">✓</span>
          <h2>Message received!</h2>
          <p>Thanks, <strong>{form.name}</strong>. I&apos;ll get back to you soon.</p>
          <button onClick={() => { setForm({ name: '', email: '', message: '' }); setSubmitted(false); }}>
            Send another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="content-page">
      <p className="section-label">Let&apos;s connect</p>
      <h1>Contact</h1>
      <p className="page-intro">
        I&apos;m open to internship opportunities, collaborations, and conversations
        about building useful web experiences.
      </p>

      <div className="contact-layout">
        <section className="contact-info">
          <div className="contact-card">
            <p className="contact-label">Currently open to</p>
            <h2>Internships &amp; collaborations</h2>
            <p>Frontend development, React projects, and opportunities to learn from a strong engineering team.</p>
          </div>
          <div className="contact-card">
            <p className="contact-label">What you can expect</p>
            <h2>Curiosity and commitment</h2>
            <p>I bring a thoughtful approach, a willingness to learn, and care for the details that make products easier to use.</p>
          </div>
        </section>

        <section className="contact-form-wrap">
          <div className="form-header">
            <h2>Send a message</h2>
            <div className="tooltip-wrap">
              <button
                className="btn-ghost small"
                onMouseEnter={() => setShowHelp(true)}
                onMouseLeave={() => setShowHelp(false)}
              >
                ℹ️ Help
              </button>
              {showHelp && (
                <div className="tooltip" role="tooltip">
                  Fill in your details and message. All fields are required.
                </div>
              )}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              Name
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="your@email.com"
                required
              />
            </label>
            <label>
              Message
              <textarea
                value={form.message}
                onChange={set('message')}
                placeholder="What would you like to discuss?"
                rows={5}
                maxLength={MAX}
                required
              />
              <span className={`char-count${form.message.length >= MAX * 0.9 ? ' warn' : ''}`}>
                {form.message.length} / {MAX}
              </span>
            </label>
            <button type="submit" disabled={!form.name || !form.email || !form.message}>
              Send message →
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main className="content-page not-found">
      <p className="section-label">404</p>
      <h1>Page not found</h1>
      <p className="page-intro">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </main>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`App${dark ? ' dark' : ''}`}>
      <Navigation dark={dark} toggleDark={() => setDark(d => !d)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Shreeja Vaishnani</p>
      </footer>
    </div>
  );
}
