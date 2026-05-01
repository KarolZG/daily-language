from flask import Flask, jsonify, request
from gemini import words

app = Flask(__name__)

# Generating the list of vocabulary
@app.route("/api/vocabulary", methods=["POST"])
def vocabulary():
    if request.method == "POST":
        params = request.get_json()
        amount = int(params.get("amount", 10))
        language = params.get("language", "German")
        subject = params.get("subject", "school")
        
        # Return Pydantic object conversed to array of dict
        response = words(amount, language, subject)
        return jsonify(response.model_dump())