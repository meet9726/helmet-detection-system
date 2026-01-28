import cv2
import requests
from ultralytics import YOLO
from datetime import datetime
import os

model = YOLO("yolov8n.pt")

video_path = "demo.mp4"  # or webcam: 0
cap = cv2.VideoCapture(video_path)

os.makedirs("output", exist_ok=True)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)

    helmet_detected = False  # simulate violation

    if not helmet_detected:
        filename = f"output/CAM01_{datetime.now().strftime('%H%M%S')}.jpg"
        cv2.imwrite(filename, frame)

        requests.post(
            "http://localhost:8080/api/detections",
            json={
                "cameraId": "CAM-01",
                "helmetDetected": False,
                "imageUrl": filename
            }
        )
        break  # send only one alert for testing

cap.release()
