
import  { useState } from 'react';

function PatientForm(props) {
    const { onSubmit, savedPatients, onSelectPatient }=props||{}
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_age: '',
    diabetic: '',
    height: '',
    weight: '',
  });
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewPatient) {
      // Validate mandatory fields
      if (!formData.name || !formData.age) {
        alert("Please fill in the mandatory fields: Patient Name and Age.");
        return;
      }
      onSubmit(formData);
    } else {
      if (!selectedPatientId) {
        alert("Please select a patient from the saved list.");
        return;
      }
      const patient = savedPatients.find((p) => p.id === selectedPatientId);
      if (patient) {
        onSelectPatient(patient);
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">Patient Information</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="patientType"
                value="new"
                checked={isNewPatient}
                onChange={() => setIsNewPatient(true)}
              />
              <label className="form-check-label">New Patient</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="patientType"
                value="existing"
                checked={!isNewPatient}
                onChange={() => setIsNewPatient(false)}
              />
              <label className="form-check-label">Existing Patient</label>
            </div>
          </div>

          {isNewPatient ? (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Patient Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Patient Age *
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="diabetic" className="form-label">
                  Diabetic (e.g., 5.8)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  id="diabetic"
                  name="diabetic"
                  value={formData.diabetic}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="height" className="form-label">
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <div className="mb-3">
              <label htmlFor="savedPatients" className="form-label">
                Select Patient
              </label>
              <select
                className="form-select"
                id="savedPatients"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {savedPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.age} yrs)
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {isNewPatient ? "Save Patient Info" : "Use Selected Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
