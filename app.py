from flask import Flask, render_template, request, redirect, url_for
import joblib
import numpy as np
import json
from pathlib import Path


# ============================================================
# FLASK APP
# ============================================================

app = Flask(__name__)


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_DIR = BASE_DIR / "model"

REVIEWS_FILE = BASE_DIR / "reviews.json"


# ============================================================
# REVIEWS FILE
# ============================================================

def init_reviews_file():
    """
    Create reviews.json if it does not already exist.
    """

    if not REVIEWS_FILE.exists():

        with open(
            REVIEWS_FILE,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                [],
                file,
                indent=4
            )


def load_reviews():
    """
    Read all reviews from reviews.json.
    """

    try:

        with open(
            REVIEWS_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except (FileNotFoundError, json.JSONDecodeError):

        return []


def save_reviews(reviews):
    """
    Save all reviews into reviews.json.
    """

    with open(
        REVIEWS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            reviews,
            file,
            indent=4,
            ensure_ascii=False
        )


# ============================================================
# LOAD TRAINED MODELS
# ============================================================

gold_model = joblib.load(
    MODEL_DIR / "gold_model.pkl"
)

apple_model = joblib.load(
    MODEL_DIR / "apple_model.pkl"
)

microsoft_model = joblib.load(
    MODEL_DIR / "microsoft_model.pkl"
)

nvidia_model = joblib.load(
    MODEL_DIR / "nvidia_model.pkl"
)

amazon_model = joblib.load(
    MODEL_DIR / "amazon_model.pkl"
)


# ============================================================
# HOME
# ============================================================

@app.route("/")
def home():

    return render_template(
        "home.html"
    )


# ============================================================
# GOLD
# ============================================================

@app.route("/gold", methods=["GET", "POST"])
def gold():

    prediction = None

    if request.method == "POST":

        open_price = float(
            request.form["open"]
        )

        high_price = float(
            request.form["high"]
        )

        low_price = float(
            request.form["low"]
        )

        volume = float(
            request.form["volume"]
        )

        features = np.array([
            [
                open_price,
                high_price,
                low_price,
                volume
            ]
        ])

        prediction = gold_model.predict(
            features
        )[0]

    return render_template(
        "gold.html",
        prediction=prediction
    )


# ============================================================
# APPLE
# ============================================================

@app.route("/apple", methods=["GET", "POST"])
def apple():

    prediction = None

    if request.method == "POST":

        open_price = float(
            request.form["open"]
        )

        high_price = float(
            request.form["high"]
        )

        low_price = float(
            request.form["low"]
        )

        volume = float(
            request.form["volume"]
        )

        features = np.array([
            [
                open_price,
                high_price,
                low_price,
                volume
            ]
        ])

        prediction = apple_model.predict(
            features
        )[0]

    return render_template(
        "apple.html",
        prediction=prediction
    )


# ============================================================
# MICROSOFT
# ============================================================

@app.route("/microsoft", methods=["GET", "POST"])
def microsoft():

    prediction = None

    if request.method == "POST":

        open_price = float(
            request.form["open"]
        )

        high_price = float(
            request.form["high"]
        )

        low_price = float(
            request.form["low"]
        )

        volume = float(
            request.form["volume"]
        )

        features = np.array([
            [
                open_price,
                high_price,
                low_price,
                volume
            ]
        ])

        prediction = microsoft_model.predict(
            features
        )[0]

    return render_template(
        "microsoft.html",
        prediction=prediction
    )


# ============================================================
# NVIDIA
# ============================================================

@app.route("/nvidia", methods=["GET", "POST"])
def nvidia():

    prediction = None

    if request.method == "POST":

        open_price = float(
            request.form["open"]
        )

        high_price = float(
            request.form["high"]
        )

        low_price = float(
            request.form["low"]
        )

        volume = float(
            request.form["volume"]
        )

        features = np.array([
            [
                open_price,
                high_price,
                low_price,
                volume
            ]
        ])

        prediction = nvidia_model.predict(
            features
        )[0]

    return render_template(
        "nvidia.html",
        prediction=prediction
    )


# ============================================================
# AMAZON
# ============================================================

@app.route("/amazon", methods=["GET", "POST"])
def amazon():

    prediction = None

    if request.method == "POST":

        open_price = float(
            request.form["open"]
        )

        high_price = float(
            request.form["high"]
        )

        low_price = float(
            request.form["low"]
        )

        volume = float(
            request.form["volume"]
        )

        features = np.array([
            [
                open_price,
                high_price,
                low_price,
                volume
            ]
        ])

        prediction = amazon_model.predict(
            features
        )[0]

    return render_template(
        "amazon.html",
        prediction=prediction
    )


# ============================================================
# COMPARISON
# ============================================================

@app.route("/compare")
def compare():

    return render_template(
        "compare.html"
    )


# ============================================================
# ABOUT + REVIEWS
# ============================================================

@app.route("/about", methods=["GET", "POST"])
def about():

    # ========================================================
    # SUBMIT REVIEW
    # ========================================================

    if request.method == "POST":

        name = request.form.get(
            "review_name",
            ""
        ).strip()

        review_text = request.form.get(
            "review_text",
            ""
        ).strip()


        # ====================================================
        # ONLY SAVE IF BOTH VALUES EXIST
        # ====================================================

        if name and review_text:

            reviews = load_reviews()

            # Create new review
            new_review = {

                "id": len(reviews) + 1,

                "name": name,

                "text": review_text
            }

            # Add review
            reviews.append(
                new_review
            )

            # Save to reviews.json
            save_reviews(
                reviews
            )


        # ====================================================
        # REDIRECT AFTER POST
        # ====================================================

        return redirect(
            url_for("about")
        )


    # ========================================================
    # LOAD REVIEWS
    # ========================================================

    reviews = load_reviews()


    # ========================================================
    # SHOW REVIEWS
    # ========================================================

    return render_template(
        "about.html",
        reviews=reviews
    )


# ============================================================
# RUN FLASK
# ============================================================

if __name__ == "__main__":

    # Create reviews.json if needed
    init_reviews_file()

    # Start Flask
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )