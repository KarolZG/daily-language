import os

from flask import Flask, jsonify, request
from files import get_today_file, get_settings, update_settings, RESPONSE_DIR, SETTINGS_PATH
from gemini import words, grammar_topic, VOCABULARY_FILE_PATH, GRAMMAR_FILE_PATH, WRITING_FILE_PATH

# Ensuring both directory output and json file daily_settings exists before making any api calls
def initialize_environment():
    if not os.path.exists(RESPONSE_DIR):
        os.makedirs(RESPONSE_DIR)
        print(f"Created directory: {RESPONSE_DIR}")
    
    if not os.path.exists(SETTINGS_PATH):
        with open(SETTINGS_PATH, 'w') as settings:
            import json
            json.dump({}, settings)
        print(f"Initialized settings file: {SETTINGS_PATH}")
        
    
initialize_environment()

app = Flask(__name__)

# Generating the list of vocabulary
@app.route("/api/vocabulary", methods=["GET", "POST"])
def vocabulary():
    if request.method == "GET":
        data = get_today_file(VOCABULARY_FILE_PATH)
        return jsonify(data if data else {"vocabulary": []})
    
    elif request.method == "POST":
        print(f"Request Data: {request.data}")
        params = request.get_json()
        if not params:
            return jsonify({"error": "No data received"}), 400
        
        amount = int(params.get("amount", 10))
        language = params.get("language", "German")
        subject = params.get("subject", "school")
        
        # Saving the language and subject choice for the future reference
        update_settings({"language": language, "subject": subject})
        
        data, is_cached = words(amount, language, subject)
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
        data, is_cached = grammar_topic(language)
        
        return jsonify(data if data else {"title": "Error", "explanation": "Could not load.", "examples": []})

# Generating the writing excercise
@app.route("/api/writing", methods=["GET", "POST"])
def writing():
    if request.method == "GET":
        data = get_today_file(WRITING_FILE_PATH)
        if data:
            return jsonify(data)
        
        return jsonify(data if data else {"instruction": ""})
    
    elif request.method == "POST":
        