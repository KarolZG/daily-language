import os
import json

from datetime import datetime

# Creating a const directory to save there all the api responses
RESPONSE_DIR = "output"

# Creating a daily settings path
# Daily settings are need for backend to orchestrate both grammar and writing exercise
SETTINGS_FILE = "daily_settings.json"
SETTINGS_PATH = os.path.join(RESPONSE_DIR, SETTINGS_FILE)

# Creating a file path
def create_path(dir_name, file_name):
    # Checking if the directory exists
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    return os.path.join(dir_name, file_name)

# Checking if today's file exists
def get_today_file(file_path):
    if os.path.exists(file_path):
        file_time = os.path.getmtime(file_path)
        last_modified = datetime.fromtimestamp(file_time).date()
        if last_modified == datetime.now().date():
            with open(file_path, 'r') as file:
                return json.load(file)
    return None

# Saving the api call response to file upon first succcessful api call
def save_to_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)
        
# Settings specific functions
def update_settings(new_data):
    data = {}
    if os.path.exists(SETTINGS_PATH):
        with open(SETTINGS_PATH, 'r') as settings:
            data = json.load(settings)
    data.update(new_data)
    with open(SETTINGS_PATH, 'w') as settings:
        json.dump(data, settings, indent=4)
        
def get_settings():
    if os.path.exists(SETTINGS_PATH):
        with open(SETTINGS_PATH, 'r') as settings:
            return json.load(settings)
    return {}