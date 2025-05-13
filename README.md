# **Eye Disease Detection System**

A web-based application that detects eye diseases from fundus images. The system can identify four conditions: **Diabetic Retinopathy**, **Glaucoma**, **Cataract**, and **Normal**. Users can input patient details, upload a fundus image, and download the diagnosis report as a PDF.

---

## **Features**

1. **Patient Information Input:**

   * Users can input the patient's name and age.
   * Click the **"Save Info"** button.

2. **Fundus Image Upload:**

   * Upload a fundus image through the interface.
   * The system automatically analyzes the image to detect the disease.

3. **Disease Detection:**

   * The system identifies the following conditions:

     * **Diabetic Retinopathy**
     * **Glaucoma**
     * **Cataract**
     * **Normal**
   * A report is generated based on the analysis.

4. **Report Download:**

   * The user can download the generated report as a PDF.

---

## **Technologies Used**

* **Frontend:**

  * React.js
  * Bootstrap

* **Backend:**

  * Flask (Python)
  * OpenCV
  * TensorFlow/PyTorch (for disease prediction)

* **Database:**

  * MongoDB

