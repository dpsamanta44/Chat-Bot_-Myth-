from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simple GK database
gk_answers = {
    "capital of france": "Paris",
    "largest planet": "Jupiter",
    "who is the president of usa": "Joe Biden",
}

def handle_math(message):
    try:
        # Only allow safe characters
        if all(c in "0123456789+-*/(). " for c in message):
            result = eval(message)
            return f"The answer is {result}"
    except:
        pass
    return None

def handle_gk(message):
    msg = message.lower()
    for q, a in gk_answers.items():
        if q in msg:
            return a
    return None


def handle_conversation(message):
    return "I'm here to help! Ask me a math question or something about general knowledge."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    reply = handle_math(user_message)
    if not reply:
        reply = handle_gk(user_message)
    if not reply:
        reply = handle_conversation(user_message)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)