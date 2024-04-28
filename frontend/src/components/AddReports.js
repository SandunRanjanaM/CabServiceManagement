import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddReports() {
    const [paymentType, setPaymentType] = useState("");
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [documentFile, setDocumentFile] = useState(null);
  
    function sendData(e) {
        e.preventDefault();

        const formData = new FormData(); 
        formData.append("paymentType", paymentType);
        formData.append("department", department);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("document", documentFile); 

        axios.post("http://localhost:8070/reports/add", formData)
            .then(() => {
                alert("Payment Report Added Successfully");
            })
            .catch((err) => {
                console.error("Error adding payment report:", err);
                alert("Error adding payment report. Please check the console for more details.");
            });

    }

    function handleFileChange(event) {
        setDocumentFile(event.target.files[0]); 
    }

    

    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
             <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
            <form onSubmit={sendData}>
            <p className="h1" style={{ textAlign: 'center' }}>Add Payment Report</p>
            <hr></hr>

                <div className="mb-3">
                    <label htmlFor="paymentType" className="form-label">Payment Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="paymentType"
                        name="paymentType" 
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
                        onChange={handleFileChange}
                    />
                </div>
                <div className="d-grid gap-2 col-6 mx-auto" style={{ textAlign: 'center' }}>
                <button type="submit" className="btn btn-outline-success">Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
}
