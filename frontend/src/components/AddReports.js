import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddReports() {
    const [paymentType, setPaymentType] = useState("");
    const [department, setDepartment] = useState("");
    const [date, setDate] = useState("");
    const [document, setDocument] = useState("");

    // Function to handle file selection
    const handleFileChange = (e) => {
        setDocument(e.target.files[0]); // Set the selected file
    };

    // Function to validate the date
    function isDateValid(inputDate) {
        const currentDate = new Date();
        const selectedDate = new Date(inputDate);
        return selectedDate.toDateString() === currentDate.toDateString();
    }

    // Function to handle form submission
    // Function to handle form submission
const sendData = async (e) => {
    e.preventDefault();
    
    if (!isDateValid(date)) {
        alert("Please enter today's date");
        return;
    }
    
    const formData = new FormData(); 
    formData.append("paymentType", paymentType);
    formData.append("department", department);
    formData.append("date", date);
    formData.append("document", document); 
    
    try {
        const response = await axios.post("http://localhost:8070/reports/addpayreports", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        console.log(response);
        console.log('Server Response:', response.data);
        alert('Payment Report Added Successfully');

        // Download the added payment report
        const reportId = response.data.reportId; // Assuming the response contains the new report's ID
        window.open(`http://localhost:8070/reports/download/${reportId}`, "_blank", "noreferrer");
    } catch (error) {
        // Logging the complete error object for detailed information
        console.error('Error:', error);
        alert('Error in adding payment report, check console for details');
    }
};

    

    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
             <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                <form onSubmit={sendData}>
                <div className="container" style={{ textAlign: 'center', color:'black' }}>
                <p class="h1">Add Payment Reports</p>
                </div>
                <hr></hr>
                    <div className="form-group">
                        <label>Payment Type</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter payment type"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <select
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Advertisement">Advertisement</option>
                            <option value="Package">Package</option>
                            <option value="Trip Order">Trip Order</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Document Upload</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={handleFileChange}
                            accept="application/pdf"
                        />
                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-outline-success">Submit</button>
                    </div>
                </form>



            </div>
        </div>
    );
}
