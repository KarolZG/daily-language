# Prompting Gemini for the vocabulary list with basic additions and memorization cues
# One successful call per day with data written into the file
import time
import os
import json

from datetime import datetime
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from typing import List

# Vocabulary file logic
# Setting the file path to save the daily vocabulary
FILE_PATH = "daily_vocabulary.json"

# Checking if the today vocabulary file exists
def get_today_file():
    if os.path.exists(FILE_PATH):
        file_time = os.path.getmtime(FILE_PATH)
        last_modified = datetime.fromtimestamp(file_time).date()
        if last_modified == datetime.now().date():
            with open(FILE_PATH, 'r') as file:
                return json.load(file)
    return None

# Saving api call response to file upon first succcessful api call
def save_to_file(data):
    with open(FILE_PATH, 'w') as file:
        json.dump(data, file)

# Gemini API Call logic    
# Defying the data structure for the query response
class WordEntry(BaseModel):
    word: str = Field("A definitive article and the word in a foreign language. Use language specific writing. e.g. umlaut characters for German.")
    translation: str = Field("English transalation of the word/expression")
    special: str = Field(description="Conjugation for verbs, plural for nouns, comparative/superlative for adjectives/adverbs")
    cue: str = Field(description="Short memorization trick in English, like a funny reference, song lyrics, etc.")
    
class VocabularyList(BaseModel):
    vocabulary: List[WordEntry]

# Prompting Gemini for the list of dictionaries with specificed key value pairs 
def words(amount, language, subject):
    # Checking if the user already made today's successful api call
    catched_data = get_today_file()
    if catched_data:
        return catched_data
    
    # Otherwise making the gemini api call 
    client = genai.Client()
    max_retries = 3
    for i in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.1-flash-lite-preview",
                contents=f"List {amount} words in {language} connected with thema {subject}. If a word is a noun, include the definitive article for the word included word in a foreign language, ",
                config= types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=VocabularyList,
                ),
            )
            # Save successful result
            data = response.parsed.model_dump()
            save_to_file(data)
            return data
        # Following industry best practices and handling server 503 response (3 attempts)
        except Exception as ex:
            if i < max_retries - 1:
                time.sleep(2)
                continue
            else:
                raise ex