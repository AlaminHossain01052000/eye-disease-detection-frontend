 
// src/PredictImage.jsx
import { useState } from 'react';

function EyeDiseaseDetection(props) {
  const { onDetection } = props || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection and store the file object
  const handleFileChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Send the original file to the backend for detection
  const handleDetect = async () => {
    if (!selectedFile) {
      setError("Please upload an image.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile, selectedFile.name);

      // Send the POST request to your Flask backend
      const detectResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!detectResponse.ok) {
        const errorData = await detectResponse.json();
        setError(errorData.error || "An error occurred during detection.");
      } else {
        const data = await detectResponse.json();
        // Pass the detection result and the uploaded image's URL to the parent component
        onDetection(data.index, URL.createObjectURL(selectedFile));
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">Upload & Detect Image</div>
      <div className="card-body">
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        {/* Display a preview of the uploaded image */}
        {selectedFile && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded Preview"
              className="img-fluid"
              style={{ maxWidth: '300px' }}
            />
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
        <button
          className="btn btn-primary mt-3"
          onClick={handleDetect}
          disabled={loading}
        >
          {loading ? "Detecting" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default EyeDiseaseDetection;
