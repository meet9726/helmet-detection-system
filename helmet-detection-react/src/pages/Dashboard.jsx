import { useEffect, useState } from "react";

import {  getSummary,
  getDetections,
  filterDetections } from "../Service/dashboardService";

import SummaryCards from "../components/SummaryCards";
import HelmetChart from "../components/HelmetChart";
import DetectionTable from "../components/DetectionTable";
import ImageUpload from "../components/ImageUpload";
import { connectSocket, disconnectSocket, playSound  } from "../Service/socketService"

const Dashboard = () => {

  const [summary, setSummary] = useState({});
  const [detections, setDetections] = useState([]);
  const [alerts, setAlerts] = useState([]);

 useEffect(() => {
  // Load dashboard on mount
  loadDashboard();
  // Connect WebSocket
  connectSocket((alert) => {
    console.log("🚨 NO HELMET detected on " + alert.cameraId);
    setAlerts(prev => [alert, ...prev]);
    playSound();
    loadDashboard(); // refresh on alert
  });
  
  return () => disconnectSocket();
}, []);

  const loadDashboard = async () => {
    const summaryRes = await getSummary();
    const detectionRes = await getDetections();

    setSummary(summaryRes.data);
    setDetections(detectionRes.data.content);
  };

  const filterData = async (helmet) => {
    const res = await filterDetections(helmet);
    setDetections(res.data.content);
  };

  return (
    <div className="container mt-4">
      {/* <h2 className="mb-4">Helmet Detection Dashboard</h2> */}
      <small className="text-muted">
        Auto-refreshing every 5 seconds
        </small>


  <div style={{ padding: "20px" }}>
      <h2>🚧 Helmet Detection Dashboard</h2>

      {alerts.length === 0 ? (
        <p>No alerts yet</p>
      ) : (
        alerts.map((a, i) => (
          <div
            key={i}
            style={{
              border: "1px solid red",
              padding: "10px",
              marginTop: "10px",
              background: "#ffe5e5"
            }}
          >
            <b>🚨 No Helmet Detected</b>
            <div>Camera: {a.cameraId}</div>
            <div>Time: {a.detectedAt}</div>
          </div>
        
        ))
      )}
    </div>

      <SummaryCards summary={summary} />

      <div className="row">
        <div className="col-md-6">
          <HelmetChart summary={summary} />
        </div>

        <div className="col-md-6 text-end">
          <button
            className="btn btn-success me-2"
            onClick={() => filterData(true)}>
            Helmet
          </button>

          <button
            className="btn btn-danger"
            onClick={() => filterData(false)}>
            No Helmet
          </button>
        </div>
      </div>

      <DetectionTable detections={detections} />

      <ImageUpload onUpload={loadDashboard} />
    </div>
  );
};

export default Dashboard;
