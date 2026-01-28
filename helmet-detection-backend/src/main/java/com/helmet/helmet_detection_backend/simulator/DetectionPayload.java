package com.helmet.helmet_detection_backend.simulator;



public class DetectionPayload {

    private String cameraId;
    private boolean helmetDetected;
    private String imageUrl;

    public DetectionPayload(
            String cameraId,
            boolean helmetDetected,
            String imageUrl) {
        this.cameraId = cameraId;
        this.helmetDetected = helmetDetected;
        this.imageUrl = imageUrl;
    }

    public String getCameraId() { return cameraId; }
    public boolean isHelmetDetected() { return helmetDetected; }
    public String getImageUrl() { return imageUrl; }
}
