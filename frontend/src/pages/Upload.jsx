import { useState } from "react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [actions, setActions] = useState([]);
  const [pdfFile, setPdfFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const uploadAudio = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("audio", file);
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTranscript(data.transcript);
      setSummary(data.summary);
      setActions(data.action_items);
      setPdfFile(data.pdf_file);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div className="upload-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .upload-root {
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
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s;
        }
        .btn-back:hover { color: #f0ede8; }

        .page {
          max-width: 820px;
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
          font-family: "Oswald", sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #f0ede8;
          margin-bottom: 0.6rem;
        }
        .page-sub {
          font-size: 0.9rem;
          color: rgba(240,237,232,0.35);
          font-weight: 300;
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        /* DROP ZONE */
        .dropzone {
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 1rem;
          padding: 3.5rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          margin-bottom: 1.5rem;
        }
        .dropzone.dragging {
          border-color: rgba(200,255,87,0.5);
          background: rgba(200,255,87,0.04);
        }
        .dropzone.has-file {
          border-color: rgba(200,255,87,0.3);
          background: rgba(200,255,87,0.03);
        }
        .dropzone:hover {
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.02);
        }
        .drop-icon {
          font-size: 2rem;
          opacity: 0.25;
          margin-bottom: 1rem;
          display: block;
        }
        .drop-main {
          font-family: "Oswald", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #f0ede8;
          margin-bottom: 0.4rem;
        }
        .drop-sub {
          font-size: 0.78rem;
          color: rgba(240,237,232,0.3);
        }
        .drop-file-name {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: #c8ff57;
          font-weight: 500;
          letter-spacing: 0.03em;
        }
        .file-input-hidden {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        /* SUBMIT ROW */
        .submit-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .btn-submit {
          font-family: "Oswald", sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          background: #c8ff57;
          color: #0d0d0f;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 2rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-submit:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .processing-tag {
          font-size: 0.78rem;
          color: rgba(240,237,232,0.3);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .pulse {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c8ff57;
          animation: blink 1.2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
        }

        .error-msg {
          margin-top: 0.75rem;
          font-size: 0.82rem;
          color: #ff6b6b;
          padding: 0.6rem 1rem;
          background: rgba(255,107,107,0.08);
          border-radius: 0.5rem;
          border-left: 2px solid rgba(255,107,107,0.4);
        }

        /* RESULT BLOCKS */
        .divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 3rem 0;
        }
        .block { margin-bottom: 2.5rem; }
        .block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .block-label {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.3);
        }
        .btn-dl {
          font-family: "Oswald", sans-serif;
          font-size: 0.78rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(240,237,232,0.5);
          padding: 0.35rem 0.9rem;
          border-radius: 2rem;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .btn-dl:hover { color: #c8ff57; border-color: rgba(200,255,87,0.35); }

        .summary-text {
          font-size: 0.95rem;
          line-height: 1.85;
          color: rgba(240,237,232,0.75);
          white-space: pre-wrap;
        }

        .actions-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .action-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.9rem 1.1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.6rem;
          font-size: 0.88rem;
          color: rgba(240,237,232,0.7);
          line-height: 1.6;
        }
        .action-num {
          font-family: "Oswald", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #c8ff57;
          opacity: 0.7;
          min-width: 1.2rem;
          padding-top: 0.1rem;
        }

        .transcript-text {
          font-size: 0.88rem;
          line-height: 2;
          color: rgba(240,237,232,0.45);
          white-space: pre-wrap;
          font-weight: 300;
        }

        @media (max-width: 720px) {
          .nav, .page { padding-left: 1.25rem; padding-right: 1.25rem; }
          .page { padding-top: 2.5rem; }
          .page-title { font-size: 2rem; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-brand">meetings<span>.</span>ai</a>
        <Link to="/" className="btn-back">← Back to Dashboard</Link>
      </nav>

      <div className="page">
        <p className="page-eyebrow">Upload Meeting</p>
        <h1 className="page-title">Upload Audio File</h1>
        <p className="page-sub">Supports MP3, WAV, and most audio formats. Processing may take a moment.</p>

        <div
          className={`dropzone ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="audio/*"
            className="file-input-hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className="drop-icon">◎</span>
          <div className="drop-main">
            {file ? "File selected" : "Drop audio file here"}
          </div>
          <div className="drop-sub">
            {file ? "" : "or click to browse"}
          </div>
          {file && (
            <div className="drop-file-name">{file.name}</div>
          )}
        </div>

        <div className="submit-row">
          <button
            onClick={uploadAudio}
            disabled={loading}
            className="btn-submit"
          >
            {loading ? "Processing…" : "Upload & Analyze"}
          </button>
          {loading && (
            <span className="processing-tag">
              <span className="pulse" /> Transcribing with Whisper
            </span>
          )}
        </div>

        {error && <div className="error-msg">{error}</div>}

        {summary && (
          <>
            <hr className="divider" />
            <div className="block">
              <div className="block-header">
                <span className="block-label">Meeting Summary</span>
                <a
                  href={`http://127.0.0.1:5000/pdfs/${pdfFile}`}
                  className="btn-dl"
                >
                  Download PDF
                </a>
              </div>
              <p className="summary-text">{summary}</p>
            </div>
          </>
        )}

        {actions.length > 0 && (
          <div className="block">
            <div className="block-header">
              <span className="block-label">Action Items</span>
            </div>
            <div className="actions-list">
              {actions.map((item, index) => (
                <div key={index} className="action-item">
                  <span className="action-num">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {transcript && (
          <div className="block">
            <div className="block-header">
              <span className="block-label">Transcript</span>
            </div>
            <p className="transcript-text">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
}