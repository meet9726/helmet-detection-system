const DetectionTable = ({ detections }) => (
  <div className="card shadow">
    <div className="card-body">
      <h5>Detection Logs</h5>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Camera</th>
            <th>Helmet</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {detections.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.cameraId}</td>
              <td>
                {d.helmetDetected
                  ? <span className="badge bg-success">Yes</span>
                  : <span className="badge bg-danger">No</span>}
              </td>
              <td>{d.detectedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DetectionTable;
