# Prompting Gemini for the vocabulary list with basic additions and memorization cues
# One successful call per day with data written into the file
import json
import logging
import os
import time

from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from typing import List

from files import create_path, get_today_file, save_to_file, update_file, RESPONSE_DIR, SETTINGS_PATH

# Set the file paths to save the daily vocabulary, grammar and writing
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
# Define the data structure for the words query response
class WordEntry(BaseModel):
    word: str = Field(description="""A definitive article and the word in a foreign language
                      with language specific writing. e.g. umlaut characters for German.""")
    translation: str = Field(description="English transalation of the word/expression")
    special: str = Field(description="""Conjugation for verbs, plural for nouns, comparative/superlative
                         for adjectives/adverbs. Only words specific information, no descripiton like plural or conjugation.""")
    cue: str = Field(description="Short memorization trick in English, like a funny reference, song lyrics, etc.")
    
class VocabularyList(BaseModel):
    vocabulary: List[WordEntry]
    
# Structure of grammar topic query response
class GrammarExample(BaseModel):
    example: str = Field(description="Example illustrating the grammar topic.")
    
class GrammarTopic(BaseModel):
    title: str = Field(description="Grammar topic title")
    explanation: str = Field(description="Explaination of the grammar topic of the provided language. At least 3 paragraphs.")
    examples: List[GrammarExample] = Field(
        min_items=3,
        max_items=5,
        description="A list of 3 to 5 examples illustrating the grammar topic."
    )

# Structure of writing instruction and feedback
class WritingInstruction(BaseModel):
    instruction: str = Field(description="Writing exercise instruction in English")
    
class WritingFeedback(BaseModel):
    mistakes: str = Field(description="Mistakes made")
    corrected_version: str = Field(description="""Improved version of user writing suggested by Gemini. 
                                   Wrap corrections in specific HTML tags like <correction>word</correction>""")
    feedback: str = Field(description="""Mistakes and proper structure explanation provided in English.
                          Tips for the future and encouragement to keep up with learning.""")

# Make an API call to Google Gemini
# Universal function used across the project for all functionalities
# Force fresh and update parameter has been added while implementing writing feedback requirement
def gemini_request(content, schema, file_path, force_fresh=False, update_mode=False):
    # Check if the daily file exists
    # The second parameter is specific to updating the file that needs persist
    # across the whole application lifecycle - previous_grammar_topics
    if not force_fresh:
        catched_data = get_today_file(file_path)
        if catched_data: return catched_data, True
    
    # If not, make the gemini api call
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
            if update_mode:
                update_file(data, file_path)
            else:
                save_to_file(data, file_path)
            return data, False
        except Exception as ex:
            logging.warning(f"Gemini API Attempt {i+1} failed: {str(ex)}")
            if i < MAX_RETRIES - 1:
                time.sleep(2)
                continue
            else:
                logging.error("All Gemini retries exhausted.")
                raise ex

# Prompt Gemini for the list of word dictionaries with specificed key value pairs 
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
        with open(PREVIOUS_GRAMMAR_PATH, 'w', encoding='utf-8') as topics:
            json.dump(history, topics, indent=4, ensure_ascii=False)

# Request a daily grammar topic
def grammar_topic(language):
    history = load_history()
    grammar_content = f"Explain a {language} grammar topic (not in {history})."
    
    data, is_cached = gemini_request(grammar_content, GrammarTopic, GRAMMAR_FILE_PATH)
    
    # Updating the daily grammar topic and the previous grammar topics list 
    if not is_cached and data:
        update_file({"grammar_topic": data["title"]}, SETTINGS_PATH)
        append_to_grammar_history(data["title"])
    return data, is_cached

# Request a daily writing exercise
def writing_instruction(language, vocabulary_subject, grammar_subject):
    writing_content = f"""Instruction for short writing exercise in {language} concentrating
                    on {vocabulary_subject} including the usage of {grammar_subject}"""
                    
    return gemini_request(writing_content, WritingInstruction, WRITING_FILE_PATH)

# Generate user writing feedback
def writing_feedback(instruction, user_writing):
    feedback_content = f"""User was given the following task {instruction}.
                    Here's the answer he submitted: {user_writing}
                    Generate feedback using the provided structure."""
                    
    return gemini_request(feedback_content, WritingFeedback, WRITING_FILE_PATH, force_fresh=True, update_mode=True)
                    
