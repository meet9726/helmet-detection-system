package com.helmet.helmet_detection_backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.helmet.helmet_detection_backend.entity.DetectionLog;
import com.helmet.helmet_detection_backend.service.AIDetectionService;
import com.helmet.helmet_detection_backend.service.DetectionLogService;
import com.helmet.helmet_detection_backend.service.FileStorageService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For React later
public class DetectionLogController {

    private final DetectionLogService service;
    private final FileStorageService fileStorageService;
    private final AIDetectionService adi;

    public DetectionLogController(DetectionLogService service, 
    	 FileStorageService fss,
    	 AIDetectionService adi) {
        this.service = service;
        this.fileStorageService = fss;
        this.adi = adi;
    }

    // Health Test API
    @GetMapping("/detections/health")
    public String healthCheck() {
        return "Helmet Detection Backend is running 🚀";
    }

    // Save Detection Log (TEMP - manual test)
    @PostMapping
    public DetectionLog createDetection(@RequestBody DetectionLog log) {
        return service.saveLog(log);
    }

    // Get All Logs
    @GetMapping
    public List<DetectionLog> getAllDetections() {
        return service.getAllLogs();
    }
    
//    @PostMapping("/upload")
//    public ResponseEntity<?> uploadFile(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("cameraId") String cameraId) {
//
//        try {
//            String filePath = fileStorageService.storeFile(file);
//
//            // TEMP: Static detection result (AI comes next)
//            DetectionLog log = new DetectionLog(
//                    cameraId,
//                    false,
//                    0.0,
//                    filePath
//            );
//
//            return ResponseEntity.ok(service.saveLog(log));
//
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    
    @PostMapping("/detections/upload")
    public ResponseEntity<?> uploadAndDetect(
            @RequestParam("file") MultipartFile file,
            @RequestParam("cameraId") String cameraId) {

        try {
            String filePath = fileStorageService.storeFile(file);

            var aiResult = adi.detectHelmet(filePath);

            Boolean helmetDetected = (Boolean) aiResult.get("helmetDetected");
            Double confidenceScore = Double.valueOf(
                    aiResult.get("confidenceScore").toString());

            DetectionLog log = new DetectionLog(
                    cameraId,
                    helmetDetected,
                    confidenceScore,
                    filePath
            );

            return ResponseEntity.ok(service.saveLog(log));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
