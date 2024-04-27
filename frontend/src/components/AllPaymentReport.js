import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//const fs = require("fs");

export default function AllPaymentReports() {

    const [reports, setReports] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const [file, setFile] = useState(null); // State for file input

    useEffect(() => {
        // Fetch payment details when the component mounts
        getReports();
    }, []);


    // Function to fetch payment report
    const getReports = () => {
        axios.get("http://localhost:8070/reports/")
            .then((res) => {
                setReports(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payment reports:", err);
            });
    };


    // Function to download a file
    const downloadFile = (fileId) => {
        axios.get(`http://localhost:8070/reports/download/${fileId}`, { responseType: "blob" })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', true);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading file:", error);
            });
    };

    
    // Function to handle editing
    const handleEdit = (id) => {
        setEditedItem(id);
        const editedItemData = reports.find((item) => item._id === id);
        setFile(editedItemData.document);
    };

     // Function to handle file input change
     const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    // Function to save edited data
    const saveEdit = (id, newData) => {
        const formData = new FormData();
        formData.append("paymentType", newData.paymentType);
        formData.append("department", newData.department);
        formData.append("date", newData.date);
        formData.append("time", newData.time);
        formData.append("document", file || newData.document); // Use the selected file or existing document
        
        axios.put(`http://localhost:8070/reports/update/${id}`, formData)
          .then(() => {
            alert("Payment report updated");
            setEditedItem(null); // Reset editedItem state after saving
            setFile(null); // Reset file state
            getReports(); // Refresh payment details
          })
          .catch((err) => {
            console.error("Error updating payment report:", err);
          });
      };
      

    // Function to delete data
    function deleteData(id) {
        axios.delete(`http://localhost:8070/reports/delete/${id}`)
            .then(() => {
                alert("Item deleted");
                // After deletion, you may want to update the state or refresh the data
                // Example: fetch updated data again
                getReports();
            })
            .catch((err) => {
                alert(err);
            });
    }

    
    return (
        <div className="p-3 mb-2 bg-transparent text-body">
            
            <p className="h1" style={{ textAlign: 'center', color:'white' }}>All Payment Reports</p>
            <hr style={{color:'white'}}/>
            <Link to="/addreports" className="btn btn-secondary">Add Payment Report</Link>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Department</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">File</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.paymentType} data-id={`${item._id}-paymentType`} /> : item.paymentType}</td>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.department} data-id={`${item._id}-department`} /> : item.department}</td>
                            <td>{editedItem === item._id ? <input type="date" defaultValue={item.date} data-id={`${item._id}-date`} /> : item.date}</td>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.time} data-id={`${item._id}-time`} /> : item.time}</td>
                            <td>
                            {editedItem === item._id ? (
                                    <input type="file" data-id={`${item._id}-document`} onChange={handleFileChange} />
                                ) : (
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => downloadFile(`http://localhost:8070/${item.document}`)}>Download File</button>

                                )}
                            </td>
                            <td>
                                {editedItem === item._id ? (
                                    <>
                                        <button onClick={() => saveEdit(item._id, {
                                            paymentType: document.querySelector(`input[data-id="${item._id}-paymentType"]`).value,
                                            department: document.querySelector(`input[data-id="${item._id}-department"]`).value,
                                            date: document.querySelector(`input[data-id="${item._id}-date"]`).value,
                                            time: document.querySelector(`input[data-id="${item._id}-time"]`).value,
                                            document: file, // Use the selected file
                                          
                                        })}>Save</button>
                                        <button onClick={() => setEditedItem(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <button type="button" className="btn btn-outline-warning" onClick={() => handleEdit(item._id)}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button type="button" className="btn btn-outline-danger" onClick={() => deleteData(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}
