const SummaryCards = ({ summary }) => (
  <div className="row mb-4">
    <div className="col-md-4">
      <div className="card shadow text-center">
        <div className="card-body">
          <h6>Total Detections</h6>
          <h3>{summary.totalDetections}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow text-center text-success">
        <div className="card-body">
          <h6>Helmet Detected</h6>
          <h3>{summary.helmetDetected}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow text-center text-danger">
        <div className="card-body">
          <h6>No Helmet</h6>
          <h3>{summary.noHelmetDetected}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default SummaryCards;
