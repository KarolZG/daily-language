# 🌎 Daily Language

**The Web App built to help you to excel at the language of your choice. It consists of 3 exercises:**
 *vocabulary
 *grammar
 *writing
**that you can and should practice daily.**

## 📋 Prerequisites
To run this app you need: Node Package Manager and Gemini API key.

## 1. ⚙️ How to setup it up?
1. Download the local copy of this repository.
2. Create the .env file in the _api_ directory.
3. Generate Google Gemini API key (free of charge):  
[Tutorial](https://ai.google.dev/gemini-api/docs/api-key "Gemini API docs")
4. Inside .env file create the key variable `GEMINI_API_KEY=` and populate it's value.
5. Save the file.

## 2. 🛠️ How to use it?
1. After setting up your local environment open two terminal windows.
2. Run commands:  
*`npm run dev`
*`npm run api`
3. Access [Port 5173](http://localhost:5173/)

## 3. 📖 Section walkthrough
Daily Language consists out of 3 exercises. The project files are saved in _/api/output_ directory.
1. _Daily Vocabulary_  
   You can generate 10, 25 or 50 words in the language of your choice on any topic you like. The general rule of thumb is to match the amount to the subject. E.g. it's difficult to generate 50 words regarding topic "greetings" and the model may halucinate. More on that in section 5.  
   Upon generation the dictionary is saved in json file __daily_vocabulary.json__ and both the language and vocabulary topic are stored in __daily_settings.json__ for further reference.
2. _Daily Grammar_  
   In order to unblock this section you need to first generate the vocabulary on the given day. The grammar paragraph will be generated automatically upon page visit, it's content saved in __daily_grammar.json__ and the subject added to __previous_grammar_topics.json__. The last file mentioned is used to keep track of already learned topics. As every project file it can be edited or deleted.
3. _Daily Writing_
   In order to unblock this section you need to generate both the daily vocabulary and grammar. You will be presented with a short writing task in the language of your choice involving the subject chosed for the vocabulary generation and randomly assigned grammar topic. All related outputs can be found in __daily_writing.json__.  
     Upon submission the writing will be sent for review. After successful api call user will be present with his sumbission, the corrected version, mistakes made and general feedback.
## 4. 💡 The "philosophy" behind the app
## 5. ✨ Gemini constrains  
   Gemini is AI and can make mistakes. 
## 6. 📂 App structure
## 7. 🙏 Acknowledgments

> **CS50x Final Project**


