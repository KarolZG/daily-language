# Prompting Gemini for the vocabulary list with basic additions and memorization cues
from pydantic import BaseModel, Field
from typing import List, Optional
from google import genai
from google.genai import types

# Defying the data structure for the query response
class WordEntry(BaseModel):
    word: str = Field("Word with its definite article if it's a noun.")
    translation: str = Field("English transalation of the word / expression")
    special: str = Field(description="Conjugation for verbs, synonims for nouns, comparative/superlative for adjectives/adverbs")
    cue: str = Field(description="Short memorization trick in English, like a funny reference, song lyrics, etc.")
    
class VocabularyList(BaseModel):
    vocabulary: List[WordEntry]

# Creating the instance of Gemini client to make the final prompt
client = genai.Client()

def words(amount, language, subject):
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite-preview",
        contents=f"List {amount} words in {language} connected with thema {subject}.",
        config= types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=VocabularyList,
        )
    )

    return response.parsed