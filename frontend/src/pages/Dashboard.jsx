import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/meetings");
      const data = await res.json();
      setMeetings(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-root">
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dashboard-root {
          min-height: 100vh;
          background: #0d0d0f;
          color: #f0ede8;
          font-family: "Oswald", sans-serif;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.4rem 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          background: rgba(13,13,15,0.92);
          backdrop-filter: blur(14px);
          z-index: 50;
        }
        .nav-brand {
          font-family:  "Oswald", sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: #f0ede8;
          text-decoration: none;
        }
        .nav-brand span { color: #c8ff57; }
        .nav-right { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          font-size: 0.85rem;
          color: rgba(240,237,232,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #f0ede8; }
        .btn-primary {
          font-family: "Oswald", sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          background: #c8ff57;
          color: #0d0d0f;
          border: none;
          padding: 0.55rem 1.25rem;
          border-radius: 2rem;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .hero {
          padding: 5rem 3rem 3.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
          margin-bottom: 1.3rem;
        }
        .hero-title {
          font-family:  "Oswald", sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.6rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #f0ede8;
          max-width: 700px;
        }
        .hero-title em {
          font-style: italic;
          font-family: "Oswald", sans-serif;
          font-weight: 300;
          color: rgba(240,237,232,0.4);
        }
        .hero-sub {
          margin-top: 1.6rem;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(240,237,232,0.45);
          max-width: 440px;
          line-height: 1.75;
        }

        .stats-band {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-top: 3rem;
        }
        .stat-cell {
          background: #0d0d0f;
          padding: 1.8rem 3rem;
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
          margin-bottom: 0.7rem;
        }
        .stat-value {
          font-family:  "Oswald", sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #f0ede8;
          letter-spacing: -0.025em;
        }
        .stat-value.md {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .stat-tag {
          margin-top: 0.45rem;
          display: inline-block;
          font-size: 0.68rem;
          letter-spacing: 0.05em;
          background: rgba(200,255,87,0.1);
          color: #c8ff57;
          padding: 0.22rem 0.6rem;
          border-radius: 2rem;
        }

        .section {
          padding: 3.5rem 3rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .section-title {
          font-family:  "Oswald", sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.5);
        }
        .section-meta {
          font-size: 0.78rem;
          color: rgba(240,237,232,0.25);
        }

        .meeting-list { display: flex; flex-direction: column; }
        .meeting-item {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: opacity 0.2s;
          cursor: default;
        }
        .meeting-item:last-child { border-bottom: none; }
        .meeting-item:hover { opacity: 0.8; }
        .meeting-item:hover .arrow { transform: translateX(4px); }
        .m-filename {
          font-family:  "Oswald", sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #f0ede8;
          margin-bottom: 0.25rem;
        }
        .m-date {
          font-size: 0.72rem;
          color: rgba(240,237,232,0.25);
          letter-spacing: 0.05em;
          margin-bottom: 0.55rem;
        }
        .m-summary {
          font-size: 0.85rem;
          color: rgba(240,237,232,0.45);
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 620px;
        }
        .m-actions { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
        .btn-outline {
          font-family: "Oswald", sans-serif;
          font-size: 0.78rem;
          color: rgba(240,237,232,0.4);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.4rem 0.9rem;
          border-radius: 2rem;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .btn-outline:hover { color: #c8ff57; border-color: rgba(200,255,87,0.3); }
        .arrow {
          color: rgba(240,237,232,0.18);
          font-size: 1rem;
          transition: transform 0.2s;
        }

        .empty {
          padding: 5rem 0;
          text-align: center;
        }
        .empty-glyph {
          font-size: 2rem;
          color: rgba(240,237,232,0.1);
          margin-bottom: 1rem;
        }
        .empty-msg {
          font-size: 0.85rem;
          color: rgba(240,237,232,0.25);
        }

        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-text {
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(240,237,232,0.18);
          text-transform: uppercase;
        }
        .dot {
          width: 7px; height: 7px;
          background: #c8ff57;
          border-radius: 50%;
          opacity: 0.5;
        }

        @media (max-width: 720px) {
          .nav, .hero, .section, .footer { padding-left: 1.25rem; padding-right: 1.25rem; }
          .hero { padding-top: 3rem; }
          .stats-band { grid-template-columns: 1fr; }
          .stat-cell { padding: 1.4rem 1.25rem; }
          .meeting-item { grid-template-columns: 1fr; gap: 0.75rem; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-brand">meetings<span>.</span>ai</a>
        <div className="nav-right">
          <a href="#recent" className="nav-link">History</a>
          <Link to="/upload" className="btn-primary">+ New Meeting</Link>
        </div>
      </nav>

      <div className="hero">
        <p className="hero-eyebrow">AI Meeting Summarizer</p>
        <h1 className="hero-title">
          Transform meetings<br /><em>into</em> actionable insights
        </h1>
        <p className="hero-sub">
          Upload meeting audio, generate summaries,
          extract action items, and download reports instantly.
        </p>
      </div>

      <div className="stats-band">
        <div className="stat-cell">
          <div className="stat-label">Total Meetings</div>
          <div className="stat-value">{meetings.length}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">AI Features</div>
          <div className="stat-value md">Whisper + Ollama + MongoDB</div>
          <div className="stat-tag">Active</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Reports</div>
          <div className="stat-value md">PDF Downloads</div>
          <div className="stat-tag">Enabled</div>
        </div>
      </div>

      <div className="section" id="recent">
        <div className="section-header">
          <h2 className="section-title">Recent Meetings</h2>
          <span className="section-meta">{meetings.length} records</span>
        </div>

        <div className="meeting-list">
          {meetings.length === 0 ? (
            <div className="empty">
              <div className="empty-glyph">◎</div>
              <p className="empty-msg">No meetings yet — upload your first recording.</p>
            </div>
          ) : (
            meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-item">
                <div>
                  <div className="m-filename">{meeting.filename}</div>
                  <div className="m-date">{meeting.created_at}</div>
                  <div className="m-summary">{meeting.summary}</div>
                </div>
                <div className="m-actions">
                  <a
                    href={`http://127.0.0.1:5000/pdfs/${meeting.pdf_file}`}
                    className="btn-outline"
                  >
                    Download PDF
                  </a>
                  <span className="arrow">→</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="footer">
        <span className="footer-text">meetings.ai — whisper + ollama</span>
        <div className="dot" />
      </div>
    </div>
  );
}