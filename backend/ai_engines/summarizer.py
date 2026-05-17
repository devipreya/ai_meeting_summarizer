import requests

OLLAMA_URL = "http://localhost:11434/api/chat"


def generate_summary(transcript):

    payload = {
        "model": "phi3",
        "messages": [
            {
                "role": "system",
                "content": "You are a professional meeting summarizer."
            },
            {
                "role": "user",
                "content": f"""
Summarize this meeting clearly:

{transcript}

Return:
- Summary
- Key decisions
- Important notes
"""
            }
        ],
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    data = response.json()

    print("OLLAMA RESPONSE:", data)

    if "message" not in data:
        return "Summary generation failed"

    return data["message"]["content"]