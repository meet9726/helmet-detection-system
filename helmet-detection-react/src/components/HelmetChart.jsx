import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HelmetChart = ({ summary }) => {
  const data = {
    labels: ["Helmet", "No Helmet"],
    datasets: [
      {
        data: [
          summary.helmetDetected,
          summary.noHelmetDetected
        ],
        backgroundColor: ["#28a745", "#dc3545"]
      }
    ]
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h5>Helmet Detection Ratio</h5>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default HelmetChart;
