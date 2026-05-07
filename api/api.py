import os

from flask import Flask, jsonify, request
from files import get_today_file, get_settings, update_file, RESPONSE_DIR, SETTINGS_PATH
from gemini import grammar_topic, words, writing_instruction, writing_feedback, VOCABULARY_FILE_PATH, GRAMMAR_FILE_PATH, WRITING_FILE_PATH

# Ensure both directory output and json file daily_settings exists before making any api calls
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

# Ensure the correct flow of daily language routine
@app.route("/api/status", methods=["GET"])
def get_status():
    vocab_data = get_today_file(VOCABULARY_FILE_PATH)
    grammar_data = get_today_file(GRAMMAR_FILE_PATH)
    
    return jsonify({
        "vocabDone": bool((vocab_data or {}).get("vocabulary")),
        "grammarDone": bool((grammar_data or {}).get("explanation"))
    })

# Generate the list of vocabulary
@app.route("/api/vocabulary", methods=["GET", "POST"])
def vocabulary():
    if request.method == "GET":
        # Return None if the file wasn't modified that day
        data = get_today_file(VOCABULARY_FILE_PATH)
        return jsonify(data if data else {"vocabulary": []})
    
    elif request.method == "POST":
        # Get the parameters from vocabulary form upon submission
        params = request.get_json()
        if not params:
            return jsonify({"error": "No data received"}), 400
        
        amount = int(params.get("amount", 10))
        language = params.get("language", "German")
        subject = params.get("subject", "school")
        
        # Save the language and subject choice for the future reference
        update_file({"language": language, "subject": subject}, SETTINGS_PATH)
        
        # Return only response data
        data, is_cached = words(amount, language, subject)
        return jsonify(data)
    
# Generate the grammar section
@app.route("/api/grammar", methods=["GET"])
def grammar():
    if request.method == "GET":
        # If the grammar request has been made and successfully saved
        # Grammar section will be returned without making the api call
        data = get_today_file(GRAMMAR_FILE_PATH)
        if data:
            return jsonify(data)
        
        settings = get_settings()
        language = settings.get("language")
        data, is_cached = grammar_topic(language)
        
        return jsonify(data if data else {"title": "Error", "explanation": "Could not load.", "examples": []})

# Generate the writing excercise
@app.route("/api/writing", methods=["GET", "POST"])
def writing():
    if request.method == "GET":
        data = get_today_file(WRITING_FILE_PATH)
        if data:
            return jsonify(data)
        
        settings = get_settings()
        language = settings.get("language")
        subject = settings.get("subject")
        grammar_subject = settings.get("grammar_topic")
    
        data, is_cached = writing_instruction(language, subject, grammar_subject)
        return jsonify(data if data else {"instruction": ""})
    
    elif request.method == "POST":
        daily_writing = get_today_file(WRITING_FILE_PATH)
        if daily_writing and "feedback" in daily_writing:
            return jsonify(daily_writing), 200
        
        data = request.get_json() 
        if not data:
            return jsonify({"error": "User writing not received"}), 400
        
        user_writing = data.get("writing")
        instruction = daily_writing.get("instruction")
        
        feedback_data, is_cached = writing_feedback(instruction, user_writing)
        if feedback_data:
            update_file({
                "writing": user_writing,
                "feedback": feedback_data.get("feedback")
                }, WRITING_FILE_PATH)
            return jsonify(feedback_data)
        return jsonify({"feedback": "Error occurred while generating feedback"})