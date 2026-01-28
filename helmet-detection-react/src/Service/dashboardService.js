import axios from "axios";
import { environment } from "../environment/environment";

const API_BASE = environment().apiUrl + "/dashboard";

export const getSummary = () =>
  axios.get(`${API_BASE}/summary`);

export const getDetections = (page = 0, size = 10) =>
  axios.get(`${API_BASE}/detections`);

export const filterDetections = (helmetDetected) =>
  axios.get(`${API_BASE}/detections/filter?helmetDetected=${helmetDetected}`);
