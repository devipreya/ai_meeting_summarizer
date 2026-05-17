import requests

OLLAMA_URL = "http://localhost:11434/api/chat"


def extract_action_items(text):

    payload = {
        "model": "phi3",
        "messages": [
            {
                "role": "user",
                "content": f"""
Extract action items from this meeting.

Return ONLY bullet points.

{text}
"""
            }
        ],
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    data = response.json()

    print("OLLAMA RESPONSE:", data)

    if "message" not in data:
        return []

    output = data["message"]["content"]

    return [
        line.strip("-• ").strip()
        for line in output.split("\n")
        if line.strip()
    ]