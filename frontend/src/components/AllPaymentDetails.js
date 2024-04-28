import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AllPaymentDetails() {
    const [paymentdetails, setPayments] = useState([]);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        getPayments();
    }, []);

    // fetch
    const getPayments = () => {
        axios.get("http://localhost:8070/paymentdetails/")
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payment details:", err);
            });
    };

    
    const handleEdit = (id) => {
        setEditedItem(id); 
    };

    // update
    const saveEdit = (id, newData) => {
        axios.put(`http://localhost:8070/paymentdetails/update/${id}`, newData)
            .then(() => {
                alert("Payment detail updated");
                setEditedItem(null);
                getPayments(); 
            })
            .catch((err) => {
                console.error("Error updating payment detail:", err);
            });
    };

    //delete
    function deleteData(id) {
        axios.delete(`http://localhost:8070/paymentdetails/delete/${id}`)
            .then(() => {
                alert("Item deleted");
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

    //report generate
    const generatePaymentDetailReciept = () => {
        const doc = new jsPDF();
    
        
        const watermarkText = "PAYMENT MANAGEMENT";
        doc.setFontSize(40);
        doc.setTextColor(200, 200, 200); 
        doc.text(watermarkText, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, { align: "center", angle: 45 });

        
        const headerText = "All Payment Details";
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(headerText, 10, 10);

        
        doc.autoTable({
            head: [['Name', 'Date', 'Payment Type', 'Amount', 'Payment Description']],
            body: paymentdetails.map(item => [item.name, item.date, item.paymentType, item.amount, item.paymentDescription]),
            startY: 20 
        });

        doc.save("allPaymentDetails_receipt.pdf");
    };
    


    return (
        <div className="p-3 mb-2 bg-transparent text-body">
           
           <div className="row">
                
                <div className="card">
                    <div className="card-body" style={{textAlign:"center"}}>
                        <h1 className="card-title">All Payment Details</h1>
                    </div>
                </div>
            
           </div>
            <hr style={{color:'white'}}/>
            <table className="table table-hover">
            
                <thead className="table-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
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

            <div class="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-secondary ml-2" onClick={() => generatePaymentDetailReciept(paymentdetails)}>Download Report</button>
            </div>
           
        </div>
    );
}
