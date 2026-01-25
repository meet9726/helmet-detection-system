package com.helmet.helmet_detection_backend.dto;


public class DashboardSummaryDTO {

    private long totalDetections;
    private long helmetDetected;
    private long noHelmetDetected;

    public DashboardSummaryDTO(
            long totalDetections,
            long helmetDetected,
            long noHelmetDetected) {
        this.totalDetections = totalDetections;
        this.helmetDetected = helmetDetected;
        this.noHelmetDetected = noHelmetDetected;
    }

    public long getTotalDetections() { return totalDetections; }
    public long getHelmetDetected() { return helmetDetected; }
    public long getNoHelmetDetected() { return noHelmetDetected; }
}
