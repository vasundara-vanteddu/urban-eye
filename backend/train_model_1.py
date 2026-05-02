import os
import shutil
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report

base_path = "C:/Users/Admin/Desktop/Miniproj_datasets"
clean_path = "dataset_clean"

classes = ["pothole", "garbage", "drainage", "streetlight", "normal"]

# create clean folders
for c in classes:
    os.makedirs(os.path.join(clean_path, c), exist_ok=True)

print("Clean folders created ✅")

import cv2

def copy_images(src_folder, dest_folder):
    for root, dirs, files in os.walk(src_folder):
        for file in files:
            if file.lower().endswith(('.jpg', '.png', '.jpeg')):
                src_path = os.path.join(root, file)
                dest_path = os.path.join(dest_folder, file)

                try:
                    shutil.copy(src_path, dest_path)
                except:
                    continue


# ---------------- POTHOLE ----------------
pothole_path = os.path.join(base_path, "Pothole Detection Dataset")

copy_images(os.path.join(pothole_path, "potholes"), os.path.join(clean_path, "pothole"))
copy_images(os.path.join(pothole_path, "normal"), os.path.join(clean_path, "normal"))


# ---------------- GARBAGE ----------------
garbage_path = os.path.join(base_path, "Garbage Classification Dataset")

for root, dirs, files in os.walk(garbage_path):
    for d in dirs:
        if d.lower() in ["cardboard", "glass", "metal", "paper", "plastic", "trash"]:
            copy_images(os.path.join(root, d), os.path.join(clean_path, "garbage"))


# ---------------- DRAINAGE ----------------
drainage_path = os.path.join(base_path, "Drainage issue Dataset")
for root, dirs, files in os.walk(drainage_path):
    if "images" in root.lower():
        copy_images(root, os.path.join(clean_path, "drainage"))


# ---------------- ROAD ISSUES → GARBAGE ----------------
road_path = os.path.join(base_path, "Road Issues Dataset")

for root, dirs, files in os.walk(road_path):
    if "garbage" in root.lower() or "litter" in root.lower():
        copy_images(root, os.path.join(clean_path, "garbage"))


# ---------------- STREETLIGHT ----------------
street_path = os.path.join(base_path, "Street-Light-Dataset")

for root, dirs, files in os.walk(street_path):
    if "not working" in root.lower():
        copy_images(root, os.path.join(clean_path, "streetlight"))
    elif "working" in root.lower():
        copy_images(root, os.path.join(clean_path, "normal"))


print("All images moved successfully 🚀")

import numpy as np
import cv2

data = []
labels = []

label_map = {
    "pothole": 0,
    "garbage": 1,
    "drainage": 2,
    "streetlight": 3,
    "normal": 4
}

for label_name in label_map:
    folder_path = os.path.join(clean_path, label_name)

    print("Reading:", label_name)

    for img_name in os.listdir(folder_path):
        img_path = os.path.join(folder_path, img_name)

        try:
            img = cv2.imread(img_path)

            if img is None:
                continue

            img = cv2.resize(img, (224, 224))   # IMPORTANT (EfficientNet size)

            data.append(img)
            labels.append(label_map[label_name])
        except:
            continue

data = np.array(data)
labels = np.array(labels)

print("\nDATA LOADED")
print("Total images:", len(data))
print("Shape:", data.shape)

data = preprocess_input(data)

model_dl = EfficientNetB0(
    weights='imagenet',
    include_top=False,
    pooling='avg'
)

features = model_dl.predict(data)

print("Feature shape:", features.shape)

X_train, X_test, y_train, y_test = train_test_split(
    features, labels, test_size=0.2, random_state=42
)

print("Train:", X_train.shape)
print("Test:", X_test.shape)

model_xgb = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    eval_metric='mlogloss'
)

model_xgb.fit(X_train, y_train)

y_pred = model_xgb.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

import joblib

joblib.dump(model_xgb, "civic_xgb_model.pkl")
print("Model saved ✅")
joblib.dump(label_map, "labels.pkl")