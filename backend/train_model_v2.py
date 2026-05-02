import os
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
from sklearn.ensemble import RandomForestClassifier

from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input

# ---------------- PATH ----------------
dataset_path = "dataset_clean"

# ---------------- LOAD FEATURE EXTRACTOR ----------------
feature_model = EfficientNetB0(
    weights="imagenet",
    include_top=False,
    pooling="avg"
)

# ---------------- DATA ----------------
X = []
y = []

# ---------------- LOAD IMAGES ----------------
for label in os.listdir(dataset_path):

    folder_path = os.path.join(dataset_path, label)

    if not os.path.isdir(folder_path):
        continue

    print(f"Loading {label}...")

    for image_name in os.listdir(folder_path):

        image_path = os.path.join(folder_path, image_name)

        try:
            img = load_img(image_path, target_size=(224, 224))
            img = img_to_array(img)
            img = np.expand_dims(img, axis=0)
            img = preprocess_input(img)

            features = feature_model.predict(img, verbose=0)

            X.append(features.flatten())
            y.append(label)

        except:
            continue

# ---------------- CONVERT ----------------
X = np.array(X)
y = np.array(y)

print("Images Loaded:", len(X))

# ---------------- LABEL ENCODING ----------------
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# ---------------- TRAIN TEST SPLIT ----------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42
)

# ---------------- MODEL ----------------
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

# ---------------- TRAIN ----------------
print("Training started...")
model.fit(X_train, y_train)

# ---------------- TEST ----------------
y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))

# ---------------- SAVE ----------------
joblib.dump(model, "civic_xgb_model_v2.pkl")
joblib.dump(encoder, "labels_v2.pkl")

print("Training Completed Successfully!")