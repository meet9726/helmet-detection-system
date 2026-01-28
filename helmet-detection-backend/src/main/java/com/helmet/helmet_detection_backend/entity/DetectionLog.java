package com.helmet.helmet_detection_backend.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "detection_logs")
public class DetectionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "camera_id")
    private String cameraId;

    @Column(name = "helmet_detected")
    private Boolean helmetDetected;

    @Column(name = "confidence_score")
    private Double confidenceScore;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "detected_at")
    private LocalDateTime detectedAt;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    
    public boolean isHelmetDetected() {
        return helmetDetected;
    }


    // Constructors
    public DetectionLog() {}

    public DetectionLog(String cameraId, Boolean helmetDetected,
                        Double confidenceScore, String imagePath) {
        this.cameraId = cameraId;
        this.helmetDetected = helmetDetected;
        this.confidenceScore = confidenceScore;
        this.imagePath = imagePath;
        this.detectedAt = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getCameraId() { return cameraId; }
    public void setCameraId(String cameraId) { this.cameraId = cameraId; }

    public Boolean getHelmetDetected() { return helmetDetected; }
    public void setHelmetDetected(Boolean helmetDetected) {
        this.helmetDetected = helmetDetected;
    }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LocalDateTime getDetectedAt() { return detectedAt; }
    public void setDetectedAt(LocalDateTime detectedAt) {
        this.detectedAt = detectedAt;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
