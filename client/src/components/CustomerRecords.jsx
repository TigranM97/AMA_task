import React, { useState } from "react";
import "./style.css";

const CustomerRecords = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [failedRecords, setFailedRecords] = useState([{}]);
  const [display, setDisplay] = useState("none");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/validate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFailedRecords(data);
      setDisplay("block");
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div>
          <input
            type="file"
            id="file_input"
            name="file"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <div className="submit-wrapper">
          <button type="submit">Validate</button>
        </div>
        {failedRecords.length ? (
          failedRecords.map((record, i) => {
            return (
              <div className="failed-record" style={{ display }} key={i}>
                <p>{record.reference}</p>
                <p>{record.description}</p>
              </div>
            );
          })
        ) : (
          <div>
            <h2>Records are valid</h2>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerRecords;
