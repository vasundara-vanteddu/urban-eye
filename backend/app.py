from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import cv2
import numpy as np
import joblib
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input

# ---------------- APP SETUP ----------------
app = Flask(__name__)
CORS(app)

# ---------------- LAZY LOAD VARIABLES ----------------
model_xgb = None
label_map = None
reverse_label_map = None
feature_extractor = None


# ---------------- LOAD MODELS ONLY WHEN NEEDED ----------------
def load_models():
    global model_xgb
    global label_map
    global reverse_label_map
    global feature_extractor

    if model_xgb is None:

        print("Loading AI Models...")

        model_xgb = joblib.load("civic_xgb_model.pkl")
        label_map = joblib.load("labels.pkl")

        reverse_label_map = {v: k for k, v in label_map.items()}

        feature_extractor = EfficientNetB0(
            weights='imagenet',
            include_top=False,
            pooling='avg'
        )

        print("Models Loaded Successfully")


# ---------------- HOME ROUTE ----------------
@app.route("/")
def home():
    return jsonify({
        "message": "Backend Running Successfully"
    })


# ---------------- AUTHORITY LOGIN ----------------
@app.route("/authority-login", methods=["POST", "GET", "OPTIONS"])
def authority_login():

    if request.method == "GET":
        return jsonify({"message": "Authority Route Working"}), 200

    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.get_json()

    department = data.get("department")
    email = data.get("email")
    password = data.get("password")

    authority_accounts = {
        "road@dept.gov": {
            "password": "road123",
            "department": "Road Department"
        },
        "drainage@dept.gov": {
            "password": "drain123",
            "department": "Drainage Department"
        },
        "electricity@dept.gov": {
            "password": "light123",
            "department": "Electricity Department"
        },
        "sanitation@dept.gov": {
            "password": "clean123",
            "department": "Sanitation Department"
        }
    }

    if email in authority_accounts:

        account = authority_accounts[email]

        if (
            password == account["password"]
            and department == account["department"]
        ):
            return jsonify({
                "success": True,
                "message": "Authority Login Successful"
            }), 200

    return jsonify({
        "success": False,
        "message": "Invalid Authority Credentials"
    }), 401


# ---------------- CITIZEN OTP ----------------
@app.route("/send-otp", methods=["POST"])
def send_otp():

    data = request.get_json()

    phone = data.get("phone")

    if not phone:
        return jsonify({
            "success": False,
            "message": "Phone number required"
        }), 400

    otp = random.randint(1000, 9999)

    print(f"\nOTP for {phone}: {otp}\n")

    return jsonify({
        "success": True,
        "message": "OTP Sent Successfully",
        "otp": otp
    }), 200


# ---------------- PREDICT ROUTE ----------------
@app.route("/predict", methods=["POST"])
def predict():

    # LOAD MODELS ONLY WHEN REQUEST COMES
    load_models()

    if "file" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "error": "No selected file"
        }), 400

    try:

        # READ IMAGE
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({
                "error": "Invalid image"
            }), 400

        # RESIZE
        img = cv2.resize(img, (224, 224))

        # PREPROCESS
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)

        # FEATURE EXTRACTION
        features = feature_extractor.predict(img)

        # PREDICT
        pred = model_xgb.predict(features)[0]

        # CONFIDENCE
        probs = model_xgb.predict_proba(features)[0]
        confidence = round(float(np.max(probs)) * 100, 2)

        predicted_label = reverse_label_map[pred]

        return jsonify({
            "prediction": predicted_label.title(),
            "confidence": f"{confidence}%"
        })

    except Exception as e:

        print("Prediction Error:", str(e))

        return jsonify({
            "error": str(e)
        }), 500


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)