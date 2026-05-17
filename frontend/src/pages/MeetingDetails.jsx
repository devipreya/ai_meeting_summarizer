import { Link } from "react-router-dom";

export default function MeetingDetails() {
  return (
    <div className="details-root">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .details-root {
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
          font-family: "Oswald", sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: #f0ede8;
          text-decoration: none;
        }
        .nav-brand span { color: #c8ff57; }
        .btn-back {
          font-size: 0.82rem;
          color: rgba(240,237,232,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .btn-back:hover { color: #f0ede8; }

        .page {
          max-width: 880px;
          margin: 0 auto;
          padding: 4rem 3rem 6rem;
        }
        .page-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
          margin-bottom: 1rem;
        }
        .page-title {
          font-family:  "Oswald", sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #f0ede8;
          margin-bottom: 2.5rem;
        }

        /* Coming soon features grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem;
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .feature-cell {
          background: #0d0d0f;
          padding: 1.8rem 2rem;
          transition: background 0.15s;
        }
        .feature-cell:hover {
          background: rgba(255,255,255,0.02);
        }
        .feature-icon {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          opacity: 0.35;
          display: block;
        }
        .feature-name {
          font-family:  "Oswald", sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f0ede8;
          margin-bottom: 0.35rem;
          letter-spacing: -0.01em;
        }
        .feature-desc {
          font-size: 0.78rem;
          color: rgba(240,237,232,0.35);
          line-height: 1.6;
          font-weight: 300;
        }
        .feature-badge {
          margin-top: 0.75rem;
          display: inline-block;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.06);
          color: rgba(240,237,232,0.3);
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
        }

        /* Placeholder content area */
        .placeholder-section {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 2.5rem;
        }
        .placeholder-label {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.25);
          margin-bottom: 1.5rem;
        }
        .placeholder-blocks {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .placeholder-line {
          height: 12px;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          animation: shimmer 2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 720px) {
          .nav, .page { padding-left: 1.25rem; padding-right: 1.25rem; }
          .page { padding-top: 2.5rem; }
          .page-title { font-size: 2rem; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-brand">meetings<span>.</span>ai</a>
        <Link to="/" className="btn-back">← Dashboard</Link>
      </nav>

      <div className="page">
        <p className="page-eyebrow">Meeting Details</p>
        <h1 className="page-title">Meeting Analytics</h1>

        

        
      </div>
    </div>
  );
}