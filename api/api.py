import time
from flask import Flask

app = Flask(__name__)

@app.route("/api/time")
def current_time():
    return {"time": time.time()}