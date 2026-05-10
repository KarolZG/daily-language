# 🌎 Daily Language

**The Web App built to help you to excel at the language of your choice. It consists of 3 exercises that you can and should practice daily.**

## 🎬 Video Demo: [YouTube](https://www.youtube.com/watch?v=BJOMMmGI8ZA "Daily Language Video Demo")

## 📋 Prerequisites
To run this app you need:
* Node Package Manager (npm)
* Gemini API key

## 1. ⚙️ How to setup it up?
1. Download the local copy of this repository.
2. Create the .env file in the _api_ directory.
3. Generate Google Gemini API key (free of charge): [Tutorial](https://ai.google.dev/gemini-api/docs/api-key "Gemini API docs")
4. Inside .env file create the key variable `GEMINI_API_KEY=` and populate it's value.
5. Save the file.

## 2. 🛠️ How to use it?
1. After setting up your local environment open two terminal windows.
2. Run commands:  
* `npm run dev`
* `npm run api`  
3. Access [Port 5173](http://localhost:5173/).

## 3. 📖 Section walkthrough
Daily Language consists out of 3 sections. The results of each are saved in _/api/output_ directory.
#### 1. _Daily Vocabulary_  
* You can generate 10, 25 or 50 words in the language of your choice on any topic you like. The general rule of thumb is to match the amount to the subject.
* e.g. it's difficult to generate 50 words regarding topic "greetings" and the model may halucinate. More on that in section 5.  
* Upon generation the dictionary is saved in json file **__daily_vocabulary.json__** and both the language and vocabulary topic are stored in **__daily_settings.json__** for further reference.

#### 2. _Daily Grammar_  
* In order to unblock this section you need to first generate the vocabulary on the given day. The grammar paragraph will be generated automatically upon page visit, it's content saved in **__daily_grammar.json__** and the subject added to **__previous_grammar_topics.json__**.  
* The last file mentioned is used to keep track of already learned topics. As every project file it can be edited or deleted.  

#### 3. _Daily Writing_
* In order to unblock this section you need to generate both the daily vocabulary and grammar. You will be presented with a short writing task in the language of your choice involving the subject chosed for the vocabulary generation and randomly assigned grammar topic. 
* All related outputs can be found in **__daily_writing.json__**.
* Upon submission the writing will be sent for review. Successful api call response results in showing the corrected version, mistakes made and general feedback.

## 4. 💡 The "philosophy" behind
It's meant to be a tool for a routine practice. Nothing more, nothing less. It uses json files instead of database and doesn't have history feature because: 
* ideally the results should be found back in user's memory, not the computer ones
* it's meant to be a personal app for individual, systematic, and focused practice, without any user tracking involved

Currently Google provides us with limit of the api calls sufficient for way more than one practice cycle. The design is kept minimalistic though and uses them sparingly - one successful api call per section (except the daily writing - 2x successful api calls have to be made). The results of these requests are being saved in the output directory for further reference. Each time the according program file is being checked for the modification date. Only if the file hasn't been modified on the given day, new cycle starts (this constrain can be easily overwritten by simply deleting the output directory, specific project files or it's key-value pairs).

## 5. ✨ Gemini constrains  
As mentioned by itself - Gemini is an AI and can make mistakes. The model used in this project is _gemini-3.1-flash-lite-preview_. When given general topic for vocabulary subject with too many inquiries, e.g. 50 words connected with thema greetings, it may start to hallucinate 😵‍💫 providing you with non-exisitng expressions as in case of Yoruba, Georgian, and Italian (as observed during testing with my lovely roommmates).

With more than 50 words the responses returned were incomplete, missing the required fields. Feel free to consult section 6 and adjust the response structure.  

In case of any doubts always consult the dictionary or any reliable source.

Rarely during the development of the app I have came across more than three 503 requests. I have followed the industry best practices and handled this exception by 2s sleep, repeated 3 times as specificed in _/api/gemini.py_ `gemini_request` function. After 3 unsuccesful api calls function returns the exception and the user needs to reload the app using frontend interface.

## 6. 📂 App structure

App uses React initialized using Vite for Frontend and Python Flask for backend.

> Using `npm run api` executes `cd api && .venv/bin/flask run --no-debugger` as defined in package.json.

### Backend

**Directory: _api/_**

| File | Purpose |
| ---- | ------- |
| api.py | Flask app, handles server requests |
| files.py | JSON file management helper functions - getters, creating and updating files, checking modification date |
| gemini.py | Gemini API response structures and Google task specific API calls |

#### Output

**Directory: _api/output_ (directory created and checked before any api calls)**

> All the project files are to be overwritten only the following day (the modification date can't be today).

| File | Purpose |
| ---- | ------- |
| daily_settings.json | Stores language, vocabulary_subject and grammar_topic. If doesn't exist, created during the flask environment initialization. Updated after successful api call for each exercise |
| daily_vocabulary.json | Stores the vocabulary objects dictionary. Created upon the first successful `/api/vocabulary` call. Updated after each following successful call by rewriting the file with the new values. |
| daily_grammar.json | Stores the grammar topic title and explanation. Created upon the first successful `/api/grammar` call. Updated after each following successful call by rewriting the file with the new values. |
| previous_grammar_topics.json | Stores all grammar topics titles discussed so far. Created upon the first successful `/api/grammar` call. Updated after each following successful call by appending the new topics. |
| daily_writing.json | Stores the writing exercise instruction, user_writing, corrected_version, mistakes, and feedback. Created upon the first successful `/api/grammar` call and populated with the instruction. Updated with user_writing upon submission. Updated with corrected_version, mistakes, and feedback upon successful gemini api call. Updated after each following successful call by rewriting the file with the new values. |

### Frontend

#### Container Components

**Directory: /src/components/pages**

| File | Purpose |
| ---- | ------- |
| GrammarPage.jsx | Fetches data from GET request (grammar section, data from json if already fetched) |
| VocabularyPage.jsx | Fetches data from GET (vocabulary form, vocabulary from json file if already fetched) and POST request (vocabulary flashcards and learn section) |
| WritingPage.jsx | Fetches data from GET (instruction, whole feedback from json file if already fetched) and POST request communication (user writing submission and whole feedback) |

**Directory: /src/components/common**

| File | Purpose |
| ---- | ------- |
| DataGate.jsx | Gatekeeper and error handler |

#### Presentational Components

**Directory: /src/components/layout**

| File | Purpose |
| ---- | ------- |
| Layout.jsx | Page structure with header, body and footer |
| Navbar.jsx | Page routing and locking logic |
| Section.jsx | Accordeon structure used in vocabulary page for learning and practice sections |

**Directory: /src/components/vocabulary**

| File | Purpose |
| ---- | ------- |
| AskVocabulary.jsx | Form to submit POST request and fetch the vocabulary list |
| LearnVocabulary.jsx | Practice vocabulary section |
| LearnVocabularyItem.jsx | Item structure, checking and navigation logic |
| Vocabulary.jsx | Fetched vocabulary list of flashcards |

**Directory: /src/components/grammar**

| File | Purpose |
| ---- | ------- |
| GrammarView.jsx | Layout of the grammar data fetched from the server |

**Directory: /src/components/writing**

| File | Purpose |
| ---- | ------- |
| Writing.jsx | Parent of WritingExcercise and WritingFeedback |
| WritingExercise.jsx | Instruction and form with text area for the user to submit his response for evaluation |
| WritingFeedback.jsx | Feedback structure with original user writing, corrected version thereof, mistakes made and conclusion included |

#### Styling

| File | Purpose |
| ---- | ------- |
| index.css | CSS variables, body styling and webkit |
| App.css | Consolidated app styling, beginning with layout, 3 exercises (v,g,w), and error handlers |

**Directory: /src/utils/**
| File | Purpose |
| ---- | ------- |
| textFormatter.jsx | Replaces the HTML <correction> tags returned by Gemini with bold green text |

_Note on styling_: The styling was generated 100% by Gemini. I have asked for every section to be identical if possible with GPT dark mode version.

## 7. 🙏 Acknowledgments
Special thanks for everyone involved in making of _CS50: Harvard Introduction to Computer Science course_ for an amazing opportunity to learn the CS fundamentals. To my roommates for giving their feedback on the lanugage content and app design. Finally to Phil, Rohan, and Akash for showing me what Giga Chads software developers can be!

> **CS50x Final Project**


