# import cv2
# import requests
# from ultralytics import YOLO
# from datetime import datetime
# import os

# model = YOLO("yolov8n.pt")

# video_path = "demo.mp4"  # or webcam: 0
# cap = cv2.VideoCapture(video_path)

# os.makedirs("output", exist_ok=True)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     results = model(frame)

#     helmet_detected = False  # simulate violation

#     if not helmet_detected:
#         filename = f"output/CAM01_{datetime.now().strftime('%H%M%S')}.jpg"
#         cv2.imwrite(filename, frame)

#         requests.post(
#             "http://localhost:8080/api/detections",
#             json={
#                 "cameraId": "CAM-01",
#                 "helmetDetected": False,
#                 "imageUrl": filename
#             }
#         )
#         break  # send only one alert for testing

# cap.release()


# 1️⃣ Reads CCTV/video
# 2️⃣ Detects persons
# 3️⃣ Detects helmets
# 4️⃣ If person exists AND helmet missing → violation
# 5️⃣ Saves image
# 6️⃣ Calls your existing Spring Boot API
# 7️⃣ WebSocket alert fires
# 8️⃣ React UI updates instantly
import cv2
import requests
import os
from ultralytics import YOLO
from datetime import datetime

# Load models
person_model = YOLO("yolov8n.pt")        # person detection
helmet_model = YOLO("models/helmet.pt")  # helmet detection

cap = cv2.VideoCapture("videos/test.mp4")
os.makedirs("output", exist_ok=True)

API_URL = "http://localhost:8080/api/detections"

def send_violation(frame):
    filename = f"output/CAM01_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    cv2.imwrite(filename, frame)

    requests.post(API_URL, json={
        "cameraId": "CAM-01",
        "helmetDetected": False,
        "imageUrl": filename
    })

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Detect persons
    persons = person_model(frame, conf=0.5)[0].boxes

    if persons is None:
        continue

    # Detect helmets
    helmets = helmet_model(frame, conf=0.5)[0].boxes

    helmet_detected = helmets is not None and len(helmets) > 0

    if not helmet_detected and len(persons) > 0:
        print("🚨 Helmet violation detected")
        send_violation(frame)
        break  # avoid spamming (demo purpose)

cap.release()
