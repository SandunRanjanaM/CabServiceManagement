import React, { useState } from "react";
import axios from "axios";
//import { Link } from "react-router";
import { Link } from "react-router-dom";
//import FileBase64 from 'react-file-base64';

export default function AddReports() {
    const [paymentType, setPaymentType] = useState("");
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
  
    /*function sendData(e) {
        e.preventDefault();

        const newReport = {
            paymentType,
            department,
            date,
            time,
            document
        };

        axios.post("http://localhost:8070/reports/add", newReport)
            .then(() => {
                alert("Payment Report Added Successfully");
            })
            .catch((err) => {
                alert("Error adding payment report")
                //alert(`Error: ${err.message}`); // Provide a more informative error message
            });
    }

    function handleReportFileChange(event) {
        const documentFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(documentFile);
        reader.onload = () => {
            setDocument(documentFile); // Update document state with base64 data
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
            console.log("Error adding document");
        };
    }*/

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData(); // Create FormData object
        formData.append("paymentType", paymentType);
        formData.append("department", department);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("document", documentFile); // Append file to FormData

        axios.post("http://localhost:8070/reports/add", formData)
            .then(() => {
                alert("Payment Report Added Successfully");
            })
            .catch((err) => {
                console.error("Error adding payment report:", err);
                alert("Error adding payment report. Please check the console for more details.");
            });

    }

    function handleReportFileChange(event) {
        const file = event.target.files[0];
        setDocumentFile(file); // Update state with the selected file
    }

    

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <legend>Enter Payment Reports</legend>

                <div className="mb-3">
                    <label htmlFor="paymentType" className="form-label">Payment Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="paymentType"
                        name="paymentType" // Add name attribute
                        placeholder="Enter payment type"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    />
                </div>

                <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    
                    <option value="" disabled>Select department</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Package">Package</option>
                    <option value="Trip Order">Trip Order</option>
                </select>
                

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        placeholder="Enter date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        placeholder="Enter time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="document">Upload</label>
                    <input
                        type="file"
                        className="form-control"
                        id="document"
                        accept=".pdf"
                        onChange={handleReportFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/allreports" className="btn btn-primary">All Payment Reports</Link>
            </form>
        </div>
    );
}
