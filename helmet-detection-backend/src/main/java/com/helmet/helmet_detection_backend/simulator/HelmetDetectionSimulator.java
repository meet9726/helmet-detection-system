package com.helmet.helmet_detection_backend.simulator;



import org.springframework.web.client.RestTemplate;

import java.util.Random;

public class HelmetDetectionSimulator {

    private static int noHelmetCount = 0;
    private static final int THRESHOLD = 5;
    private static final String API_URL =
            "http://localhost:8080/api/detections";

    public static void main(String[] args) {

        RestTemplate restTemplate = new RestTemplate();
        Random random = new Random();

        while (true) {

            boolean helmetDetected = random.nextBoolean();

            if (!helmetDetected) {
                noHelmetCount++;
            } else {
                noHelmetCount = 0;
            }

            System.out.println("Helmet Detected: " + helmetDetected +
                    " | NoHelmetFrames: " + noHelmetCount);

            if (noHelmetCount >= THRESHOLD) {

                DetectionPayload payload =
                        new DetectionPayload(
                                "SITE_CAM_01",
                                false,
                                "http://localhost:8080/images/nohelmet.jpg"
                        );

                restTemplate.postForObject(
                        API_URL,
                        payload,
                        Object.class
                );

                System.out.println("🚨 NO HELMET EVENT SENT");
                noHelmetCount = 0;
            }

            try {
                Thread.sleep(1000); // 1 frame per second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
