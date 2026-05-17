from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import os
import subprocess
from datetime import datetime

from db import meetings

from ai_engines.transcription import transcribe_audio
from ai_engines.summarizer import generate_summary
from ai_engines.action_items import extract_action_items

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PDF_FOLDER = "pdfs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PDF_FOLDER, exist_ok=True)


# ---------------- PDF GENERATOR ----------------

def generate_pdf(transcript, summary, actions):

    filename = f"meeting_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    pdf_path = os.path.join(PDF_FOLDER, filename)

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "AI Meeting Report",
            styles["Title"]
        )
    )

    content.append(Spacer(1, 12))

    # SUMMARY
    content.append(
        Paragraph(
            "Summary",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            summary.replace("\n", "<br/>"),
            styles["Normal"]
        )
    )

    content.append(Spacer(1, 12))

    # ACTION ITEMS
    content.append(
        Paragraph(
            "Action Items",
            styles["Heading2"]
        )
    )

    for item in actions:

        content.append(
            Paragraph(
                f"• {item}",
                styles["Normal"]
            )
        )

    content.append(Spacer(1, 12))

    # TRANSCRIPT
    content.append(
        Paragraph(
            "Transcript",
            styles["Heading2"]
        )
    )

    content.append(
        Paragraph(
            transcript[:5000].replace("\n", "<br/>"),
            styles["Normal"]
        )
    )

    doc.build(content)

    return filename


# ---------------- HOME ----------------

@app.route("/")
def home():

    return jsonify({
        "message": "Backend Running"
    })


# ---------------- UPLOAD ----------------

@app.route("/upload", methods=["POST"])
def upload_audio():

    try:

        if "audio" not in request.files:

            return jsonify({
                "error": "No audio file uploaded"
            }), 400

        audio = request.files["audio"]

        # SAVE ORIGINAL FILE
        mp3_path = os.path.join(
            UPLOAD_FOLDER,
            audio.filename
        )

        audio.save(mp3_path)

        # CONVERT TO WAV
        wav_path = os.path.join(
            UPLOAD_FOLDER,
            "converted.wav"
        )

        subprocess.run([
            "ffmpeg",
            "-y",
            "-i", mp3_path,
            "-ac", "1",
            "-ar", "16000",
            wav_path
        ], check=True)

        # ---------------- TRANSCRIPTION ----------------

        transcript = transcribe_audio(wav_path)

        # SAFETY LIMIT
        transcript = transcript[:3000]

        # ---------------- LLM ----------------

        summary = generate_summary(transcript)

        actions = extract_action_items(transcript)

        # ---------------- PDF ----------------

        pdf_file = generate_pdf(
            transcript,
            summary,
            actions
        )

        # ---------------- DATABASE ----------------

        meeting_data = {

            "filename": audio.filename,

            "transcript": transcript,

            "summary": summary,

            "action_items": actions,

            "pdf_file": pdf_file,

            "created_at": datetime.now()
        }

        meetings.insert_one(meeting_data)

        # ---------------- RESPONSE ----------------

        return jsonify({

            "message": "Success",

            "transcript": transcript,

            "summary": summary,

            "action_items": actions,

            "pdf_file": pdf_file
        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500


# ---------------- PDF DOWNLOAD ----------------

@app.route("/pdfs/<filename>")
def download_pdf(filename):

    return send_from_directory(
        PDF_FOLDER,
        filename,
        as_attachment=True
    )


# ---------------- GET MEETINGS ----------------

@app.route("/meetings")
def get_meetings():

    data = []

    all_meetings = meetings.find().sort("created_at", -1)

    for meeting in all_meetings:

        data.append({

            "id": str(meeting["_id"]),

            "filename": meeting.get("filename", ""),

            "summary": meeting.get("summary", ""),

            "pdf_file": meeting.get("pdf_file", ""),

            "created_at": str(
                meeting.get("created_at", "")
            )
        })

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)