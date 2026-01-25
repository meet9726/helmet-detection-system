package com.helmet.helmet_detection_backend.service;


import org.springframework.stereotype.Service;

import com.helmet.helmet_detection_backend.dto.DashboardSummaryDTO;
import com.helmet.helmet_detection_backend.repository.DetectionLogRepository;

@Service
public class DashboardService {

    private final DetectionLogRepository repository;

    public DashboardService(DetectionLogRepository repository) {
        this.repository = repository;
    }

    public DashboardSummaryDTO getSummary() {

        long total = repository.count();
        long helmet = repository.countByHelmetDetected(true);
        long noHelmet = repository.countByHelmetDetected(false);

        return new DashboardSummaryDTO(
                total,
                helmet,
                noHelmet
        );
    }
}
