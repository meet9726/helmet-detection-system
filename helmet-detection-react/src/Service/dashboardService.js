import axios from "axios";

const API_BASE = "http://localhost:8080/api/dashboard";

export const getSummary = () =>
  axios.get(`${API_BASE}/summary`);

export const getDetections = (page = 0, size = 10) =>
  axios.get(`${API_BASE}/detections`);

export const filterDetections = (helmetDetected) =>
  axios.get(`${API_BASE}/detections/filter?helmetDetected=${helmetDetected}`);
