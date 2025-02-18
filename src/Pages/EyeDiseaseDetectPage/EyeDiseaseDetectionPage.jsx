/* eslint-disable no-unused-vars */

import  { useState } from 'react';

import './EyeDiseaseDetectionPage.css'; // Custom CSS file for additional styling
import PatientForm from '../../components/PatientForm/PatientForm';
import EyeDiseaseDetection from '../../components/EyeDiseaseDetection/EyeDiseaseDetection';
import PatientReport from '../../components/PatientReport/PatientReport';

function EyeDiseaseDetectionPage() {
  // Patient info, saved patients, detection result and cropped image state
  const [patientData, setPatientData] = useState(null);
  const [savedPatients, setSavedPatients] = useState([]); // Ideally fetched from your DB
  const [detection, setDetection] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [reportVisible, setReportVisible] = useState(false);

  // Called when a new patient is added via the form.
  const handlePatientFormSubmit = (data) => {
    setPatientData(data);
    // TODO: Optionally save the patient info to the database via an API call
  };

  // Called when detection has been made.
  const handledetection = (result, imageUrl) => {
    setDetection(result);
    setCroppedImage(imageUrl);
    setReportVisible(true);
    
  };

  // Called when user selects an existing patient.
  const handlePatientSelect = (patient) => {
    setPatientData(patient);
  };

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#F4F9F9", minHeight: "100vh" }}
    >
      <h1 className="text-center mb-4">Eye Disease Detection</h1>
      <div className="row">
        {/* Left column: Patient Information */}
        <div className="col-md-6">
          <PatientForm
            onSubmit={handlePatientFormSubmit}
            savedPatients={savedPatients}
            onSelectPatient={handlePatientSelect}
          />
        </div>
        {/* Right column: Image Upload & detection */}
        <div className="col-md-6">
          <EyeDiseaseDetection onDetection={handledetection} />
        </div>
      </div>
      {/* Show the report only after a detection has been made */}
      {reportVisible && patientData && detection !== null && (
        <PatientReport
          patientData={patientData}
          detection={detection}
          croppedImage={croppedImage}
        />
      )}
    </div>
  );
}

export default EyeDiseaseDetectionPage;
