import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllPaymentDetails() {
    const [paymentdetails, setPayments] = useState([]);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        // Fetch payment details when the component mounts
        getPayments();
    }, []);

    // Function to fetch payment details
    const getPayments = () => {
        axios.get("http://localhost:8070/paymentdetails/")
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payment details:", err);
            });
    };

    // Function to handle editing
    const handleEdit = (id) => {
        setEditedItem(id); // Set the editedItem state to the ID of the item being edited
    };

    // Function to save edited data
    const saveEdit = (id, newData) => {
        axios.put(`http://localhost:8070/paymentdetails/update/${id}`, newData)
            .then(() => {
                alert("Payment detail updated");
                setEditedItem(null); // Reset editedItem state after saving
                getPayments(); // Refresh payment details
            })
            .catch((err) => {
                console.error("Error updating payment detail:", err);
            });
    };

    //Function to delete data
    function deleteData(id) {
        axios.delete(`http://localhost:8070/paymentdetails/delete/${id}`)
            .then(() => {
                alert("Item deleted");
                // After deletion, you may want to update the state or refresh the data
                // Example: fetch updated data again
                axios.get("http://localhost:8070/paymentdetails")
                    .then(response => {
                        setPayments(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }
    


    return (
        <div>
            <h1>All Payment Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentdetails.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.name} data-id={`${item._id}-name`} /> : item.name}</td>
                            <td>{editedItem === item._id ? <input type="date" defaultValue={item.date} data-id={`${item._id}-date`} /> : item.date}</td>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.paymentType} data-id={`${item._id}-paymentType`} /> : item.paymentType}</td>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.amount} data-id={`${item._id}-amount`} /> : item.amount}</td>
                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.paymentDescription} data-id={`${item._id}-paymentDescription`} /> : item.paymentDescription}</td>
                            <td>
                                {editedItem === item._id ? (
                                    <>
                                        <button onClick={() => saveEdit(item._id, {
                                            paymentType: document.querySelector(`input[data-id="${item._id}-paymentType"]`).value,
                                            amount: document.querySelector(`input[data-id="${item._id}-amount"]`).value,
                                            paymentDescription: document.querySelector(`input[data-id="${item._id}-paymentDescription"]`).value,
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
