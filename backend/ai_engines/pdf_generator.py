from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(summary, actions, filename="meeting_report.pdf"):

    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    content = []

    content.append(Paragraph("Meeting Summary", styles["Heading1"]))
    content.append(Spacer(1, 12))
    content.append(Paragraph(summary, styles["BodyText"]))

    content.append(Spacer(1, 12))
    content.append(Paragraph("Action Items", styles["Heading1"]))

    for item in actions:
        content.append(Paragraph(f"- {item}", styles["BodyText"]))

    doc.build(content)

    return filename