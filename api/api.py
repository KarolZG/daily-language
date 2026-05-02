from flask import Flask, jsonify, request
from vocabulary import get_today_file, words

app = Flask(__name__)

# Generating the list of vocabulary
@app.route("/api/vocabulary", methods=["GET", "POST"])
def vocabulary():
    if request.method == "GET":
        data = get_today_file()
        return jsonify(data if data else {"vocabulary": []})
    
    elif request.method == "POST":
        params = request.get_json()
        amount = int(params.get("amount", 10))
        language = params.get("language", "German")
        subject = params.get("subject", "school")
        data = words(amount, language, subject)
        return jsonify(data)