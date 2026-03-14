# # import cv2
# # import requests
# # from ultralytics import YOLO
# # from datetime import datetime
# # import os

# # model = YOLO("yolov8n.pt")

# # video_path = "demo.mp4"  # or webcam: 0
# # cap = cv2.VideoCapture(video_path)

# # os.makedirs("output", exist_ok=True)

# # while cap.isOpened():
# #     ret, frame = cap.read()
# #     if not ret:
# #         break

# #     results = model(frame)

# #     helmet_detected = False  # simulate violation

# #     if not helmet_detected:
# #         filename = f"output/CAM01_{datetime.now().strftime('%H%M%S')}.jpg"
# #         cv2.imwrite(filename, frame)

# #         requests.post(
# #             "http://localhost:8080/api/detections",
# #             json={
# #                 "cameraId": "CAM-01",
# #                 "helmetDetected": False,
# #                 "imageUrl": filename
# #             }
# #         )
# #         break  # send only one alert for testing

# # cap.release()


# # 1️⃣ Reads CCTV/video
# # 2️⃣ Detects persons
# # 3️⃣ Detects helmets
# # 4️⃣ If person exists AND helmet missing → violation
# # 5️⃣ Saves image
# # 6️⃣ Calls your existing Spring Boot API
# # 7️⃣ WebSocket alert fires
# # 8️⃣ React UI updates instantly
# # import cv2
# # import requests
# # import os
# # from ultralytics import YOLO
# # from datetime import datetime

# # # Load models
# # person_model = YOLO("yolov8n.pt")        # person detection
# # helmet_model = YOLO("models/helmet.pt")  # helmet detection

# # cap = cv2.VideoCapture("videos/test.mp4")
# # os.makedirs("output", exist_ok=True)

# # API_URL = "http://localhost:8080/api/detections"

# # def send_violation(frame):
# #     filename = f"output/CAM01_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
# #     cv2.imwrite(filename, frame)

# #     requests.post(API_URL, json={
# #         "cameraId": "CAM-01",
# #         "helmetDetected": False,
# #         "imageUrl": filename
# #     })

# # while cap.isOpened():
# #     ret, frame = cap.read()
# #     if not ret:
# #         break

# #     # Detect persons
# #     persons = person_model(frame, conf=0.5)[0].boxes

# #     if persons is None:
# #         continue

# #     # Detect helmets
# #     helmets = helmet_model(frame, conf=0.5)[0].boxes

# #     helmet_detected = helmets is not None and len(helmets) > 0

# #     if not helmet_detected and len(persons) > 0:
# #         print("🚨 Helmet violation detected")
# #         send_violation(frame)
# #         break  # avoid spamming (demo purpose)

# # cap.release()
# #  ----------------- detect camera without helmet -----------------
# import cv2
# import requests
# import os
# import json
# import threading
# from ultralytics import YOLO
# from datetime import datetime

# # Load models
# person_model = YOLO("yolov8n.pt")
# helmet_model = YOLO("models/helmet.pt")

# API_URL = "http://localhost:8080/api/detections"
# os.makedirs("output", exist_ok=True)


# def detect_all_cameras(max_test=10):
#     """Detect all connected cameras"""
#     available_cameras = []
    
#     print("🔍 Scanning for connected cameras...")
    
#     for index in range(max_test):
#         cap = cv2.VideoCapture(index)
        
#         if cap.isOpened():
#             ret, frame = cap.read()
#             if ret and frame is not None:
#                 width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#                 height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                
#                 camera_info = {
#                     "index": index,
#                     "id": f"CAM-{index:02d}",
#                     "name": f"Camera {index}",
#                     "source": index,
#                     "type": "webcam",
#                     "resolution": f"{width}x{height}",
#                     "status": "active"
#                 }
                
#                 available_cameras.append(camera_info)
#                 print(f"✅ Camera {index} - {width}x{height}")
            
#             cap.release()
    
#     print(f"\n📹 Total cameras detected: {len(available_cameras)}\n")
#     return available_cameras


# def send_violation(frame, camera_id, camera_name):
#     """Send violation to backend"""
#     timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
#     filename = f"output/{camera_id}_{timestamp}.jpg"
#     cv2.imwrite(filename, frame)
    
#     try:
#         response = requests.post(API_URL, json={
#             "cameraId": camera_id,
#             "cameraName": camera_name,
#             "helmetDetected": False,
#             "imageUrl": filename,
#             "timestamp": datetime.now().isoformat()
#         }, timeout=5)
        
#         if response is not None and response.status_code == 200:
#             print(f"✅ [{camera_id}] Violation alert sent")
#         else:
#             print(f"⚠️ [{camera_id}] Failed to send: {response.status_code if response else 'No response'}")
#     except Exception as e:
#         print(f"❌ [{camera_id}] Error: {e}")


# def process_camera(camera_info):
#     """Process single camera for helmet detection"""
#     camera_id = camera_info['id']
#     camera_name = camera_info['name']
#     source = camera_info['source']
    
#     print(f"🎥 Starting: {camera_id} - {camera_name}")
    
#     cap = cv2.VideoCapture(source)
    
#     if not cap.isOpened():
#         print(f"❌ Failed to open {camera_id}")
#         return
    
#     frame_count = 0
#     violation_cooldown = 0
    
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             print(f"⚠️ {camera_id} stream ended")
#             break
        
#         frame_count += 1
        
#         # Process every 15th frame
#         if frame_count % 15 != 0:
#             continue
        
#         # Detect persons (class 0 in COCO)
#         person_results = person_model(frame, conf=0.5, classes=[0])[0]
#         persons = person_results.boxes
        
#         if persons is None or len(persons) == 0:
#             continue
        
#         # Detect helmets
#         helmet_results = helmet_model(frame, conf=0.5)[0]
#         helmets = helmet_results.boxes
        
#         person_count = len(persons)
#         helmet_count = len(helmets) if helmets is not None else 0
        
#         # Violation: More persons than helmets
#         if person_count > helmet_count and violation_cooldown == 0:
#             print(f"🚨 [{camera_id}] VIOLATION: {person_count} person(s), {helmet_count} helmet(s)")
#             send_violation(frame, camera_id, camera_name)
#             violation_cooldown = 60  # 60 frames cooldown (~6 seconds)
        
#         if violation_cooldown > 0:
#             violation_cooldown -= 1
        
#         # Optional: Display live feed
#         cv2.putText(frame, f"{camera_id} | P:{person_count} H:{helmet_count}", 
#                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
#         cv2.imshow(f"{camera_id}", frame)
        
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
    
#     cap.release()
#     cv2.destroyWindow(f"{camera_id}")
#     print(f"🛑 {camera_id} stopped")


# def main():
#     """Main function"""
#     # Auto-detect all cameras
#     cameras = detect_all_cameras(max_test=10)
    
#     if not cameras:
#         print("❌ No cameras detected!")
#         return
    
#     print(f"🚀 Starting helmet detection on {len(cameras)} camera(s)\n")
    
#     # Create thread for each camera
#     threads = []
#     for camera in cameras:
#         thread = threading.Thread(target=process_camera, args=(camera,))
#         thread.daemon = True
#         thread.start()
#         threads.append(thread)
    
#     try:
#         for thread in threads:
#             thread.join()
#     except KeyboardInterrupt:
#         print("\n⚠️ Stopping all cameras...")
#         cv2.destroyAllWindows()


# if __name__ == "__main__":
#     main()


import cv2
import time
import requests
from ultralytics import YOLO
import os

# ==========================
# CONFIGURATION
# ==========================

os.makedirs("output", exist_ok=True)

# CCTV RTSP URL (replace with your camera)
RTSP_URL = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"

# Spring Boot API


API_URL = "http://localhost:8080/api/detection/upload"

# Load YOLO model
model = YOLO("yolov8n.pt")

# Cooldown time to avoid multiple alerts
last_violation_time = 0
cooldown_seconds = 10

# ==========================
# START CCTV STREAM
# ==========================

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Cannot connect to CCTV")
    exit()

print("CCTV Connected Successfully...")

# ==========================
# PROCESS FRAMES
# ==========================

while True:

    ret, frame = cap.read()

    if not ret:
        print("Failed to read frame")
        break

    results = model(frame)

    violation = False

    for r in results:

        boxes = r.boxes

        for box in boxes:

            cls = int(box.cls[0])
            conf = float(box.conf[0])

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            label = model.names[cls]

            # Draw bounding box
            if label == "person":

                violation = True
                color = (0,0,255)

                cv2.putText(frame,"NO HELMET",(x1,y1-10),
                            cv2.FONT_HERSHEY_SIMPLEX,0.7,color,2)

            else:
                color = (0,255,0)

            cv2.rectangle(frame,(x1,y1),(x2,y2),color,2)

    # ==========================
    # HANDLE VIOLATION
    # ==========================

    if violation and time.time() - last_violation_time > cooldown_seconds:

        # filename = f"violations/violation_{int(time.time())}.jpg"  
        filename = f"output/CAM01_{int(time.time())}.jpg"
        

        cv2.imwrite(filename, frame)

        print("Violation Captured:", filename)

        try:

            
            files = { "file": ("violation.jpg", open(filename, "rb"), "image/jpeg")}
            


            data = {"cameraId":"CAM01"}

            response = requests.post(API_URL, files=files, data=data)

            print("Response:", response.text)
            print("API Response:", response.status_code)

        except Exception as e:
            print("API Error:", e)

        last_violation_time = time.time()

    # ==========================
    # SHOW LIVE VIDEO
    # ==========================

    cv2.imshow("Helmet Detection - Live CCTV", frame)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()