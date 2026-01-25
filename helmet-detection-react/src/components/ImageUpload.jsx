import axios from "axios";
import { useState } from "react";

const ImageUpload = ({ onUpload }) => {

  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("cameraId", "CAM-01");

    await axios.post(
      "http://localhost:8080/api/detection/upload",
      formData
    );

    onUpload(); // refresh dashboard
  };

  return (
    <div className="card shadow p-3 mb-4">
      <h5>Upload Detection Image</h5>
      <input
        type="file"
        className="form-control mb-2"
        onChange={e => setFile(e.target.files[0])}
      />
      <button
        className="btn btn-primary"
        onClick={uploadImage}>
        Upload & Detect
      </button>
    </div>
  );
};

export default ImageUpload;
