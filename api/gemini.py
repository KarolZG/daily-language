# Prompting Gemini for the vocabulary list with basic additions and memorization cues
# One successful call per day with data written into the file
import json
import os
import time

from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from typing import List

from files import create_path, get_today_file, save_to_file, update_settings, RESPONSE_DIR

# Setting the file paths to save the daily vocabulary, grammar and writing
VOCABULARY_FILE = "daily_vocabulary.json"
VOCABULARY_FILE_PATH = create_path(RESPONSE_DIR, VOCABULARY_FILE)

GRAMMAR_FILE = "daily_grammar.json"
GRAMMAR_FILE_PATH = create_path(RESPONSE_DIR, GRAMMAR_FILE)

WRITING_FILE = "daily_writing.json"
WRITING_FILE_PATH = create_path(RESPONSE_DIR, WRITING_FILE)

# Grammar specific path - previous topics
PREVIOUS_GRAMMAR_FILE = "previous_grammar_topics.json"
PREVIOUS_GRAMMAR_PATH = create_path(RESPONSE_DIR, PREVIOUS_GRAMMAR_FILE)

# Following industry best practices to handle server 503 response used try, except block (with 3 attempts)
MAX_RETRIES = 3

# Gemini API Call logic
# Defining the data structure for the words query response
class WordEntry(BaseModel):
    word: str = Field(description="A definitive article and the word in a foreign language with language specific writing. e.g. umlaut characters for German.")
    translation: str = Field(description="English transalation of the word/expression")
    special: str = Field(description="Conjugation for verbs, plural for nouns, comparative/superlative for adjectives/adverbs. Only words specific information, no descripiton like plural or conjugation.")
    cue: str = Field(description="Short memorization trick in English, like a funny reference, song lyrics, etc.")
    
class VocabularyList(BaseModel):
    vocabulary: List[WordEntry]
    
# Structure of grammar topic query response
class GrammarTopic(BaseModel):
    subject: str = Field(description="Grammar topic title")
    explaination: str = Field(description="Explaination of the grammar topic of the provided language supported by 3 examples")

# Structure of writing instruction and feedback
class WritingInstruction(BaseModel):
    instruction: str = Field("Writing exercise instruction")
    
def gemini_request(content, schema, file_path):
    # Checking if the daily file exists
    catched_data = get_today_file(file_path)
    if catched_data:
        return catched_data
    
    # If not, making the gemini api call
    client = genai.Client()
    for i in range(MAX_RETRIES):
        try:
            response = client.models.generate_content(
                model="gemini-3.1-flash-lite-preview",
                contents=content,
                config= types.GenerateContentConfig(
                    response_mime_type='application/json',
                    response_schema=schema,
                ),
            )
            data = response.parsed.model_dump()
            save_to_file(data, file_path)
            return data
        except Exception as ex:
            if i < MAX_RETRIES - 1:
                time.sleep(2) 
                continue
            else:
                raise ex

# Prompting Gemini for the list of word dictionaries with specificed key value pairs 
def words(amount, language, subject):
    words_content = f"List {amount} words in {language} connected with thema {subject}."
    return gemini_request(words_content, VocabularyList, VOCABULARY_FILE_PATH)
           
# Grammar request helper functions
def load_history():
    history = []
    if os.path.exists(PREVIOUS_GRAMMAR_PATH):
        with open(PREVIOUS_GRAMMAR_PATH, 'r') as topics:
            history = json.load(topics)
    return history

def append_to_grammar_history(topic):
    history = load_history()
    if topic not in history:
        history.append(topic)
        with open(PREVIOUS_GRAMMAR_PATH, 'w') as topics:
            json.dump(history, topics, indent=4)

# Request a daily grammar topic
def grammar_topic(language):
    history = load_history()
    grammar_content = f"Explain a {language} grammar topic (not in {history}). Ilustrate it with 3 examples.)"
    
    data = gemini_request(grammar_content, GrammarTopic, GRAMMAR_FILE_PATH)
    
    if data:
        update_settings({"grammar_topic_title": data["subject"]})
        append_to_grammar_history(data["subject"])
    return data

# Request a daily writing exercise
def writing_exercise(language, vocabulary_subject, grammar_subject):
    writing_content = f"""Instruction for short writing exercise in {language} concentrating
                    on {vocabulary_subject} including the usage of {grammar_subject}"""
    return gemini_request(writing_content, WritingInstruction, WRITING_FILE_PATH)
