import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import _ from 'lodash'; 

export default function AllDriverPayments() {
    const [driverpayments, setDriverpayments] = useState([]);
    const [filteredDriverPayments, setFilteredDriverPayments] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [editedItem, setEditedItem] = useState(null);
    const [totalCompanyCommission, setTotalCompanyCommission] = useState(0);
    const [totalFinalSalary, setTotalFinalSalary] = useState(0);

    
    useEffect(() => {
        getDriverpayments();
    }, []);

    useEffect(() => {
        filterDriverPayments();
    }, [driverpayments, searchEmail]);
    
    // Fetch
    const getDriverpayments = () => {
        axios.get("http://localhost:8070/driverpayments/alldriverpay")
            .then((res) => {
                setDriverpayments(res.data);
                calculateTotals(res.data);
            })
            .catch((err) => {
                console.error("Error fetching payment details:", err);
            });
    };

    // Commission and final salary calculation
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
        setEditedItem(id); 
    };

    // Update
    const saveEdit = (id, newData) => {
        axios.put(`http://localhost:8070/driverpayments/updatedriverpay/${id}`, newData)
            .then(() => {
                alert("Driver payment updated");
                setEditedItem(null); 
                getDriverpayments(); 
            })
            .catch((err) => {
                console.error("Error updating payment detail:", err);
            });
    };

    //Delete
    function deleteData(id) {
        axios.delete(`http://localhost:8070/driverpayments/deletedriverpay/${id}`)
            .then(() => {
                alert("Item deleted");
                axios.get("http://localhost:8070/driverpayments")
                    .then(response => {
                        setDriverpayments(response.data);
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

    //Generate Report
    const generateDriverPaymentReceipt = () => {
        const doc = new jsPDF();
    
        // Set watermark
        const watermarkText = "PAYMENT MANAGEMENT";
        const watermarkFontSize = 40;
        const watermarkColor = [200, 200, 200]; 

        // Set header
        const headerText = "All Driver Payments";
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); 
        doc.text(headerText, 10, 10);
    
       
        for (let i = 1; i <= doc.getNumberOfPages(); i++) {
            doc.setPage(i);
            doc.setFontSize(watermarkFontSize);
            doc.setTextColor(...watermarkColor);
            doc.text(watermarkText, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, { align: "center", angle: 45 });
        }
    
        
        doc.setPage(1);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
    
        
        const headers = ["Name", "Email", "Date", "Amount", "Company Commission", "Final Salary"];
        const data = filteredDriverPayments.map(payment => [payment.name, payment.email, payment.date, payment.amount, payment.companycommission, payment.finalsalary]);
    
        
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 20
        });
    
        
        const totalCompanyCommissionText = "Total Company Commission:";
        const totalFinalSalaryText = "Total Final Salary:";
        const totals = [
            [totalCompanyCommissionText, totalCompanyCommission.toString()],
            [totalFinalSalaryText, totalFinalSalary.toString()]
        ];
        doc.autoTable({
            body: totals,
            startY: doc.autoTable.previous.finalY + 10 // Start after the previous table
        });
    
        
        doc.save("allDriverPayments_receipt.pdf");
    };

    // Search function
    const filterDriverPayments = () => {
        const filteredData = driverpayments.filter((payment) =>
            payment.email && payment.email.toLowerCase().includes(searchEmail.toLowerCase())
        );
        setFilteredDriverPayments(filteredData);
    };

   
    const handleSearch = () => {
        
        setFilteredDriverPayments([]);
        filterDriverPayments();
    };


    return(
        
        <div className="p-3 mb-2 bg-transparent text-body">
           
           <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <table className="table table-hover table-dark">
                <thead className="table-striped-columns" >
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Final Salary</th>
                    </tr>
                </thead>
                <tbody>
                {filteredDriverPayments.map((payment, index) => (
                    <tr key={payment._id}>
                        <td>{index + 1}</td>
                        <td>{payment.name}</td>
                        <td>{payment.email}</td>
                        <td>{payment.finalsalary}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            <hr style={{color:'white'}}/>
            
            <div className="row" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }} >
                
                    <div className="card" >
                        <div className="card-body" style={{textAlign:"center"}}>
                            <h1 className="card-title">All Driver Payments</h1>
                        </div>
                    </div>
                
            </div>

            <Link to="/adddriverpayment" className="btn btn-primary">Calculate Driver Payments</Link>

           <hr style={{color:'white'}}/>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
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
                                <input type="email" defaultValue={item.email} data-id={`${item._id}-email`} />
                            ) : (
                                item.email
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
                                        email : document.querySelector(`input[data-id="${item._id}-email"]`)?.value,
                                        date : document.querySelector(`input[data-id="${item._id}-date"]`)?.value,
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
            <div class="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-secondary ml-2" onClick={() => generateDriverPaymentReceipt(driverpayments)}>Download Report</button>
            </div>
        </div>
    )
}
