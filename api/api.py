from flask import Flask, jsonify, request
from files import get_today_file, get_settings, update_settings
from gemini import words, grammar_topic, VOCABULARY_FILE_PATH, GRAMMAR_FILE_PATH, WRITING_FILE_PATH

app = Flask(__name__)

# Generating the list of vocabulary
@app.route("/api/vocabulary", methods=["GET", "POST"])
def vocabulary():
    if request.method == "GET":
        data = get_today_file(VOCABULARY_FILE_PATH)
        return jsonify(data if data else {"vocabulary": []})
    
    elif request.method == "POST":
        params = request.get_json()
        amount = int(params.get("amount", 10))
        language = params.get("language", "German")
        subject = params.get("subject", "school")
        
        # Saving the language choice for the future reference
        update_settings({"language": language})
        
        data = words(amount, language, subject)
        return jsonify(data)
    
# Generating the grammar section
@app.route("/api/grammar", methods=["GET"])
def grammar():
    if request.method == "GET":
        data = get_today_file(GRAMMAR_FILE_PATH)
        if data:
            return jsonify(data)
        
        settings = get_settings()
        language = settings.get("language", "German")
        data = grammar_topic(language)
        return jsonify(data)

# Generating the writing excercise
@app.route("/api/writing", methods=["GET", "POST"])
def writing():
    if request.method == "GET":
        data = get_today_file(WRITING_FILE_PATH)
        return jsonify(data if data else {"writing": ""})
    elif request.method == "POST":
        return jsonify({"writing": "TO-DO"})