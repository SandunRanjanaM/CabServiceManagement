import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import _ from 'lodash'; // Import lodash
import './SystemUsersTable.css';

const AllsystemUsers = () => {
    const [systemUsers, setSystemUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/systemusers")
            .then(response => {
                setSystemUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function updateSystemUser(id, updatedUserData) {
        axios.put(`http://localhost:8070/systemusers/update/${id}`, updatedUserData)
            .then(() => {
                alert("System user updated");
                axios.get("http://localhost:8070/systemusers")
                    .then(response => {
                        setSystemUsers(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    function deleteSystemUser(id) {
        axios.delete(`http://localhost:8070/systemusers/delete/${id}`)
            .then(() => {
                alert("System user deleted");
                axios.get("http://localhost:8070/systemusers")
                    .then(response => {
                        setSystemUsers(response.data);
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
        setEditedUser(id);
    }

    function handleInputChange(event, key) {
        const updatedSystemUsers = [...systemUsers];
        const userIndex = updatedSystemUsers.findIndex(user => user._id === key);
        updatedSystemUsers[userIndex][event.target.name] = event.target.value;
        setSystemUsers(updatedSystemUsers);
    }

    function saveUpdatedData(id) {
        const userToUpdate = systemUsers.find(user => user._id === id);
        
        // Phone number validation
        if (!/^\d{10}$/.test(userToUpdate.phone_number)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        
        updateSystemUser(id, userToUpdate);
        setEditedUser(null);
    }

    function generatePDF() {
        // Create new jsPDF instance
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text("System Users Report", 10, 10);

        // Prepare table data
        const tableData = systemUsers.map(user => [user.Emp_ID, user.name, user.password, user.phone_number, user.address, user.Emp_Type]);

        // Add auto table plugin
        doc.autoTable({
            head: [['Employee ID', 'Name', 'Password', 'Phone Number', 'Address', 'Employee Type']],
            body: tableData,
        });

        // Save the PDF
        doc.save("system_users_report.pdf");
    }

    // Function to filter system users based on search query using lodash
    const filteredUsers = _.filter(systemUsers, (user) => user.Emp_ID.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <><div>
            <input style={{marginTop:"5vh",marginLeft:"5vw",width:"15vw"}}
                type="text"
                placeholder="Search by ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} /></div><div className="table-wrapper">

                
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Password</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Employee Type</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.Emp_ID}</td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="name" value={user.name} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="password" value={user.password} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.password
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="phone_number" value={user.phone_number} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.phone_number
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="address" value={user.address} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.address
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="Emp_Type" value={user.Emp_Type} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.Emp_Type
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <button className="btn btn-update" onClick={() => saveUpdatedData(user._id)}>Save</button>
                                        ) : (
                                            <button className="btn btn-update" onClick={() => handleEdit(user._id)}>Edit</button>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteSystemUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{marginTop:"10px"}}>
                    <button className="btn btn-primary" onClick={generatePDF}>Generate PDF</button>
                </div>
                </div>
            </div></>
    );
};

export default AllsystemUsers;
