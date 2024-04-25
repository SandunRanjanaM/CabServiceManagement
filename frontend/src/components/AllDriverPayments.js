import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDriverPayments() {
    const [driverpayments, setDriverpayments] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const [totalCompanyCommission, setTotalCompanyCommission] = useState(0);
    const [totalFinalSalary, setTotalFinalSalary] = useState(0);

    useEffect(() => {
        // Fetch payment details when the component mounts
        getDriverpayments();
    }, []);
    
    // Function to fetch payment details
    const getDriverpayments = () => {
        axios.get("http://localhost:8070/driverpayments/")
            .then((res) => {
                setDriverpayments(res.data);
                // Calculate totals after fetching data
                calculateTotals(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payment details:", err);
            });
    };

    // Function to calculate totals
    const calculateTotals = (data) => {
        let totalCompanyComm = 0;
        let totalFinalSal = 0;
        data.forEach((item) => {
            totalCompanyComm += item.companycommission;
            totalFinalSal += item.finalsalary;
        });
        setTotalCompanyCommission(totalCompanyComm);
        setTotalFinalSalary(totalFinalSal);
    };

    // Function to handle editing
    const handleEdit = (id) => {
        setEditedItem(id); // Set the editedItem state to the ID of the item being edited
    };

    // Function to save edited data
    const saveEdit = (id, newData) => {
        axios.put(`http://localhost:8070/driverpayments/update/${id}`, newData)
            .then(() => {
                alert("Driver payment updated");
                setEditedItem(null); // Reset editedItem state after saving
                getDriverpayments(); // Refresh payment details
            })
            .catch((err) => {
                console.error("Error updating payment detail:", err);
            });
    };

    //Function to delete data
    function deleteData(id) {
        axios.delete(`http://localhost:8070/driverpayments/delete/${id}`)
            .then(() => {
                alert("Item deleted");
                // After deletion, you may want to update the state or refresh the data
                // Example: fetch updated data again
                axios.get("http://localhost:8070/driverpayments")
                    .then(response => {
                        setDriverpayments(response.data);
                        // Calculate totals after deletion
                        calculateTotals(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    return(
        <div className="p-3 mb-2 bg-transparent text-body">
           <p className="h1" style={{ textAlign: 'center', color:'white' }}>All Driver Payments</p>
           <hr style={{color:'white'}}/>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Company Commission</th>
                        <th scope="col">Final Salary</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {driverpayments.map((item, index) => (
                    <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            {editedItem === item._id ? (
                                <input type="text" defaultValue={item.name} data-id={`${item._id}-name`} />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editedItem === item._id ? (
                                <input type="date" defaultValue={item.date} data-id={`${item._id}-date`} />
                            ) : (
                                item.date
                            )}
                        </td>
                        <td>{item.amount}</td>
                        <td>{item.companycommission}</td>
                        <td>{item.finalsalary}</td>
                        <td>
                            {editedItem === item._id ? (
                                <>
                                    <button onClick={() => saveEdit(item._id, {
                                        amount: document.querySelector(`input[data-id="${item._id}-amount"]`)?.value,
                                        companycommission: document.querySelector(`input[data-id="${item._id}-companycommission"]`)?.value,
                                        finalsalary: document.querySelector(`input[data-id="${item._id}-finalsalary"]`)?.value,
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
                <tfoot>
                    <tr>
                        <td colSpan="4"></td>
                        <td>Total Company Commission: {totalCompanyCommission}</td>
                        <td>Total Final Salary: {totalFinalSalary}</td>
                        <td></td>
                    </tr>
                </tfoot>
                
            </table>
        </div>
    )
}
