package com.helmet.helmet_detection_backend.service;


import org.springframework.stereotype.Service;

import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.repository.DetectionLogRepository;

import java.util.List;

@Service
public class DetectionLogService {

    private final DetectionLogRepository repository;

    public DetectionLogService(DetectionLogRepository repository) {
        this.repository = repository;
    }

    public DetectionLog saveLog(DetectionLog log) {
        return repository.save(log);
    }

    public List<DetectionLog> getAllLogs() {
        return repository.findAll();
    }
}
