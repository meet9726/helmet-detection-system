package com.helmet.helmet_detection_backend.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import com.helmet.helmet_detection_backend.dto.DashboardSummaryDTO;
import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.repository.DetectionLogRepository;
import com.helmet.helmet_detection_backend.service.DashboardService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")

public class DashboardController {

    private final DashboardService dashboardService;
    private final DetectionLogRepository repository;

    public DashboardController(
            DashboardService dashboardService,
            DetectionLogRepository repository) {
        this.dashboardService = dashboardService;
        this.repository = repository;
    }

    // 🔹 Summary Cards API
    @GetMapping("/dashboard/summary")
    public DashboardSummaryDTO getSummary() {
        return dashboardService.getSummary();
    }

    // 🔹 Detection List (Paginated)
    @GetMapping("/dashboard/detections")
    public Page<DetectionLog> getDetections(
    		 @RequestParam(value = "page", defaultValue = "0") int page,
    	        @RequestParam(value = "size", defaultValue = "10") int size) {

        return repository.findAll(PageRequest.of(page, size));
    }

    // 🔹 Filter: Helmet / No Helmet
    @GetMapping("/dashboard/detections/filter")
    public Page<DetectionLog> filterByHelmet(
    		@RequestParam(value ="helmetDetected" , defaultValue = "false") Boolean helmetDetected) {

        return repository.findByHelmetDetected(helmetDetected,PageRequest.of(0, 10));
    }
}

