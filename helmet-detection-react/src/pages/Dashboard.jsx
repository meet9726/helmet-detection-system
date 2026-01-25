import { useEffect, useState } from "react";

import {  getSummary,
  getDetections,
  filterDetections } from "../Service/dashboardService";

import SummaryCards from "../components/SummaryCards";
import HelmetChart from "../components/HelmetChart";
import DetectionTable from "../components/DetectionTable";
import ImageUpload from "../components/ImageUpload";

const Dashboard = () => {

  const [summary, setSummary] = useState({});
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    loadDashboard();
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
      <h2 className="mb-4">Helmet Detection Dashboard</h2>

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
