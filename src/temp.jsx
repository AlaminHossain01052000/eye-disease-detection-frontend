// src/App.jsx
import { useState } from 'react';
import './App.css';
import PredictEyeDisease from './components/PredictEyeDisease';

function App() {
  // State to hold the selected file, prediction result, error messages, and loading state
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection from the input element
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPrediction(null);
    setError(null);
  };

  // Submit the form and call the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Prepare form data to send the image file
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Send POST request to the Flask backend
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      // If response is not ok, display the error message
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred during prediction.");
      } else {
        const data = await response.json();
        setPrediction(data.index);
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
    
    setLoading(false);
  };
const classLebels=["cataract", "diabetic_retinopathy", "glaucoma", "normal"]
  return (
    
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Eye Disease Prediction</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Predicting..." : "Upload and Predict"}
        </button>
      </form>

      {/* Display the prediction result if available */}
      {prediction !== null && (
        <div>
          <h2>Prediction Result:</h2>
          <p>
            <strong>Predicted Index:</strong> {classLebels[prediction]}
          </p>
          {/* <p>
            (0: cataract, 1: diabetic_retinopathy, 2: glaucoma, 3: normal)
          </p> */}
        </div>
      )}

      {/* Display error message if any */}
      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
