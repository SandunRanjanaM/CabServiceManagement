import React, { useState } from "react";
import axios from "axios";

const UploadFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // State for upload status

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8070/uploads/fileUpload", formData);
      setUploadStatus("File uploaded successfully!"); // Set upload status message
      onUploadSuccess(); // Call the onUploadSuccess callback
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again."); // Set error message
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      {/* Display upload status message */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadFile;
