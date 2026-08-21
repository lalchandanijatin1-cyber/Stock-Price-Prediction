# 📈 StockPredict — Stock Price Prediction Using Machine Learning

<p align="center">

  <img src="static/trading_logo.png" width="120">

</p>

<h3 align="center">
  Machine Learning Based Stock Price Prediction Web Application
</h3>

<p align="center">
  A Flask-based educational project that uses historical market data,
  regression algorithms and a web interface to predict stock closing prices.
</p>

---

# 🚀 Working Model

### 🌐 Live Demo


🔗 **Working Model:** 

https://stock-price-prediction-a7vc.onrender.com

---

# 📌 Project Overview

**StockPredict** is a Machine Learning based web application developed to understand how historical financial data can be used to train regression models and generate stock closing-price predictions.

The project combines:

- 🧠 Machine Learning
- 🐍 Python
- 🌐 Flask
- 📝 HTML
- 🎨 CSS
- ⚡ JavaScript
- 📦 Joblib
- 💾 JSON

The application provides a web interface where users can enter:

- Open Price
- High Price
- Low Price
- Trading Volume

and receive a predicted **Closing Price** from the trained Machine Learning model.

The main purpose of this project is **learning and experimentation with Machine Learning**, rather than providing real-world financial predictions.

---

# 🏗️ Project Structure

The project is organized into separate sections for the Flask backend, trained Machine Learning models, HTML templates, CSS styling, JavaScript functionality and image assets.

```text
Stock-Price-Prediction/
│
├── app.py
│
├── model/
│   ├── gold_model.pkl
│   ├── apple_model.pkl
│   ├── amazon_model.pkl
│   ├── nvidia_model.pkl
│   └── microsoft_model.pkl
│
├── templates/
│   ├── home.html
│   ├── gold.html
│   ├── apple.html
│   ├── amazon.html
│   ├── nvidia.html
│   ├── microsoft.html
│   ├── compare.html
│   └── about.html
│
├── static/
│   │
│   ├── trading_logo.png
│   ├── trading_pic.png
│   │
│   ├── css/
│   │   ├── home.css
│   │   ├── gold.css
│   │   ├── apple.css
│   │   ├── amazon.css
│   │   ├── nvidia.css
│   │   ├── microsoft.css
│   │   ├── compare.css
│   │   └── about.css
│   │
│   ├── js/
│   │   ├── home.js
│   │   ├── gold.js
│   │   ├── apple.js
│   │   ├── amazon.js
│   │   ├── nvidia.js
│   │   ├── microsoft.js
│   │   ├── compare.js
│   │   └── about.js
│   │
│   └── image/
│       ├── gold_image.png
│       ├── apple_image.png
│       ├── amazon_image.png
│       ├── nvidia_image.png
│       └── microsoft_image.png
│
├── reviews.json
├── requirements.txt
└── README.md


                         USER
                           │
                           ▼
                    HTML / CSS / JS
                           │
                           ▼
                         Flask
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        Gold Model     Apple Model    Amazon Model
            │              │              │
            └──────────────┼──────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
       NVIDIA Model                 Microsoft Model
            │                             │
            └──────────────┬──────────────┘
                           ▼
                  Predicted Close Price
