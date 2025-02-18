// src/Report.jsx
import  { useRef } from 'react';
import jsPDF from 'jspdf';
// If desired, you can import 'jspdf-autotable' for advanced table layouts
// import 'jspdf-autotable';

function PatientReport(props) {
    const { patientData, detection, croppedImage }=props||{}
  const reportRef = useRef(null);
  const classLabels = ["cataract", "diabetic-retinopathy", "glaucoma", "normal"];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Eye Disease Detection Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientData.name}`, 14, 30);
    doc.text(`Patient Age: ${patientData.age}`, 14, 38);
    if (patientData.diabetic) {
      doc.text(`Diabetic: ${patientData.diabetic}`, 14, 46);
    }
    if (patientData.height) {
      doc.text(`Height: ${patientData.height}`, 14, 54);
    }
    if (patientData.weight) {
      doc.text(`Weight: ${patientData.weight}`, 14, 62);
    }
    const currentDate = new Date().toLocaleString();
    doc.text(`Date & Time: ${currentDate}`, 14, 70);

    doc.text(`Detected Disease: ${classLabels[detection]}`, 14, 78);

    // Add image to PDF if available. We load the image from the cropped URL.
    if (croppedImage) {
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => {
        // Adjust the width/height as needed
        doc.addImage(img, 'JPEG', 14, 85, 100, 100);
        doc.save(`${patientData.name}-${classLabels[detection]}-report.pdf`);
      };
    } else {
      doc.save("report.pdf");
    }
  };

  return (
    <div className="card mb-4" ref={reportRef}>
      <div className="card-header bg-secondary text-white">Eye Disease Detection Report</div>
      <div className="card-body">
        <h4 className="mb-3">Report</h4>
        <p>
          <strong>Patient Name:</strong> {patientData.name}
        </p>
        <p>
          <strong>Patient Age:</strong> {patientData.age}
        </p>
        {patientData.diabetic && (
          <p>
            <strong>Diabetic:</strong> {patientData.diabetic}
          </p>
        )}
        {patientData.height && (
          <p>
            <strong>Height:</strong> {patientData.height}
          </p>
        )}
        {patientData.weight && (
          <p>
            <strong>Weight:</strong> {patientData.weight}
          </p>
        )}
        <p>
          <strong>Date & Time:</strong> {new Date().toLocaleString()}
        </p>
        <p>
          <strong>Detected Disease:</strong> {classLabels[detection]}
        </p>
        {croppedImage && (
          <div>
            <p>
              <strong>Uploaded Image:</strong>
            </p>
            <img
              src={croppedImage}
              alt="Cropped"
              className="img-fluid"
              style={{ maxWidth: '300px' }}
            />
          </div>
        )}
        <button className="btn btn-success mt-3" onClick={handleDownloadPDF}>
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}

export default PatientReport;
