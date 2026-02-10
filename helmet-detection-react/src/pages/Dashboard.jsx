import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {  getSummary,
  getDetections,
  filterDetections } from "../Service/dashboardService";

import SummaryCards from "../components/SummaryCards";
import HelmetChart from "../components/HelmetChart";
import DetectionTable from "../components/DetectionTable";
import ImageUpload from "../components/ImageUpload";
import { connectSocket, disconnectSocket, playSound  } from "../Service/socketService"

const Dashboard = () => {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({});
  const [detections, setDetections] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const handleLogout = async () => {

      const token = sessionStorage.getItem('token');
    
    try {
        await fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always remove token from client
        sessionStorage.removeItem('token');
        navigate('/login');
        // Disconnect WebSocket
       disconnectSocket();
    }   
  };

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
      {/* Header with Logout Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>🚧 Helmet Detection Dashboard</h2>
        <button 
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
        </button>
      </div>
      <small className="text-muted">
        Auto-refreshing every 5 seconds
        </small>




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
