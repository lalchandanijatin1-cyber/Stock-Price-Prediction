from flask import Flask, render_template, request
import joblib
import numpy as np
from pathlib import Path


# =========================
# FLASK APP
# =========================

app = Flask(__name__)


# =========================
# PROJECT PATH
# =========================

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "model"


# =========================
# LOAD TRAINED MODELS
# =========================

gold_model = joblib.load(MODEL_DIR / "gold_model.pkl")
apple_model = joblib.load(MODEL_DIR / "apple_model.pkl")
microsoft_model = joblib.load(MODEL_DIR / "microsoft_model.pkl")
nvidia_model = joblib.load(MODEL_DIR / "nvidia_model.pkl")
amazon_model = joblib.load(MODEL_DIR / "amazon_model.pkl")


# =========================
# HOME
# =========================

@app.route("/")
def home():
    return render_template("home.html")


# =========================
# GOLD
# =========================

@app.route("/gold", methods=["GET", "POST"])
def gold():

    prediction = None

    if request.method == "POST":

        open_price = float(request.form["open"])
        high_price = float(request.form["high"])
        low_price = float(request.form["low"])
        volume = float(request.form["volume"])

        features = np.array([
            [open_price, high_price, low_price, volume]
        ])

        prediction = gold_model.predict(features)[0]

    return render_template(
        "gold.html",
        prediction=prediction
    )


# =========================
# APPLE
# =========================

@app.route("/apple", methods=["GET", "POST"])
def apple():

    prediction = None

    if request.method == "POST":

        open_price = float(request.form["open"])
        high_price = float(request.form["high"])
        low_price = float(request.form["low"])
        volume = float(request.form["volume"])

        features = np.array([
            [open_price, high_price, low_price, volume]
        ])

        prediction = apple_model.predict(features)[0]

    return render_template(
        "apple.html",
        prediction=prediction
    )


# =========================
# MICROSOFT
# =========================

@app.route("/microsoft", methods=["GET", "POST"])
def microsoft():

    prediction = None

    if request.method == "POST":

        open_price = float(request.form["open"])
        high_price = float(request.form["high"])
        low_price = float(request.form["low"])
        volume = float(request.form["volume"])

        features = np.array([
            [open_price, high_price, low_price, volume]
        ])

        prediction = microsoft_model.predict(features)[0]

    return render_template(
        "microsoft.html",
        prediction=prediction
    )


# =========================
# NVIDIA
# =========================

@app.route("/nvidia", methods=["GET", "POST"])
def nvidia():

    prediction = None

    if request.method == "POST":

        open_price = float(request.form["open"])
        high_price = float(request.form["high"])
        low_price = float(request.form["low"])
        volume = float(request.form["volume"])

        features = np.array([
            [open_price, high_price, low_price, volume]
        ])

        prediction = nvidia_model.predict(features)[0]

    return render_template(
        "nvidia.html",
        prediction=prediction
    )


# =========================
# AMAZON
# =========================

@app.route("/amazon", methods=["GET", "POST"])
def amazon():

    prediction = None

    if request.method == "POST":

        open_price = float(request.form["open"])
        high_price = float(request.form["high"])
        low_price = float(request.form["low"])
        volume = float(request.form["volume"])

        features = np.array([
            [open_price, high_price, low_price, volume]
        ])

        prediction = amazon_model.predict(features)[0]

    return render_template(
        "amazon.html",
        prediction=prediction
    )


# =========================
# COMPARE
# =========================

@app.route("/compare")
def compare():
    return render_template("compare.html")


# =========================
# ABOUT
# =========================

@app.route("/about")
def about():
    return render_template("about.html")


# =========================
# RUN FLASK
# =========================

if __name__ == "__main__":
    app.run(debug=True)