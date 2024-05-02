import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import _ from 'lodash';
import './SystemUsersTable.css';

const AllSalaries = () => {
    const [salary, setSalary] = useState([]);
    const [editedSalary, setEditedSalary] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/salary")
            .then(response => {
                setSalary(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function updateSalary(id, updatedSalaryData) {
        axios.put(`http://localhost:8070/salary/update/${id}`, updatedSalaryData)
            .then(() => {
                alert("Salary updated");
                axios.get("http://localhost:8070/salary")
                    .then(response => {
                        setSalary(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    function deleteSalary(id) {
        axios.delete(`http://localhost:8070/salary/delete/${id}`)
            .then(() => {
                alert("Salary deleted");
                axios.get("http://localhost:8070/salary")
                    .then(response => {
                        setSalary(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    function handleEdit(id) {
        setEditedSalary(id);
    }

    function handleInputChange(event, key) {
        const updatedSalary = [...salary];
        const salaryIndex = updatedSalary.findIndex(salary => salary._id === key);
        updatedSalary[salaryIndex][event.target.name] = event.target.value;
        setSalary(updatedSalary);
    }

    function saveUpdatedData(id) {
        const salaryToUpdate = salary.find(salary => salary._id === id);
        // Calculate Final Salary based on Worked Days and Basic Salary
        const finalSalary = salaryToUpdate.Worked_Days * salaryToUpdate.Basic_Salary;
        salaryToUpdate.Final_Salary = finalSalary;

        updateSalary(id, salaryToUpdate);
        setEditedSalary(null);
    }

    function generatePDF() {
        const doc = new jsPDF();
        // Add a title to the PDF
        doc.text("Salary Report", 10, 10);
        // Prepare table data
        const tableData = salary.map(salary => [salary.Emp_ID, salary.Date, salary.Month, salary.Worked_Days, salary.Basic_Salary, salary.Final_Salary]);
        // Add auto table plugin
        doc.autoTable({
            head: [['Employee ID', 'Date', 'Month', 'Worked Days', 'Basic Salary', 'Final Salary']],
            body: tableData,
        });
        // Save the PDF
        doc.save("salary_report.pdf");
    }

    // Function to filter salary records based on search query using lodash
        const filteredSalary = _.filter(salary, (user) => user.Emp_ID.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
        <>
            <div className="search-bar">
                <input style={{ marginTop: "5vh", marginLeft: "5vw", width: "15vw" }}
                    type="text"
                    placeholder="Search by ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />


                <button style={{ marginLeft: "100vh" }} className="btn btn-primary" onClick={generatePDF}>Generate PDF</button>
            </div>



            <div className="table-wrapper">

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Date</th>
                                <th>Month</th>
                                <th>Worked Days</th>
                                <th>Basic Salary</th>
                                <th>Final Salary</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalary.map(salary => (
                                <tr key={salary._id}>
                                    
                                    <td>{salary.Emp_ID}</td>

                                    <td>{salary.Date}</td>

                                    <td>
                                        {editedSalary === salary._id ? (
                                            <input type="text" name="Month" value={salary.Month} onChange={(event) => handleInputChange(event, salary._id)} />
                                        ) : (
                                            salary.Month
                                        )}
                                    </td>

                                    <td>
                                        {editedSalary === salary._id ? (
                                            <input type="number" name="Worked_Days" value={salary.Worked_Days} onChange={(event) => handleInputChange(event, salary._id)} />
                                        ) : (
                                            salary.Worked_Days
                                        )}
                                    </td>
                                    <td>
                                        {editedSalary === salary._id ? (
                                            <input type="number" name="Basic_Salary" value={salary.Basic_Salary} onChange={(event) => handleInputChange(event, salary._id)} />
                                        ) : (
                                            salary.Basic_Salary
                                        )}
                                    </td>
                                    <td>
                                        {editedSalary === salary._id ? (
                                            <input type="number" value={salary.Worked_Days * salary.Basic_Salary} readOnly />
                                        ) : (
                                            salary.Final_Salary
                                        )}
                                    </td>
                                    <td>
                                        {editedSalary === salary._id ? (
                                            <button className="btn btn-update" onClick={() => saveUpdatedData(salary._id)}>Save</button>
                                        ) : (
                                            <button className="btn btn-update" onClick={() => handleEdit(salary._id)}>Edit</button>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteSalary(salary._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </>
    );
};

export default AllSalaries;
