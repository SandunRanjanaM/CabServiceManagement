import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './CabTable.css';

const CabTable = () => {
    const [cabs, setCabs] = useState([]);
    const { id } = useParams(); // Get the id parameter from the URL
    const [editedCab, setEditedCab] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setCabs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function deleteData(id) {
        axios.delete(`http://localhost:8070/cab/delete/${id}`)
            .then(() => {
                alert("Item deleted");
                // After deletion, you may want to update the state or refresh the data
                // Example: fetch updated data again
                axios.get("http://localhost:8070/cab")
                    .then(response => {
                        setCabs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    const handleEdit = (id) => {
        setEditedCab(id);
    };

    const cancelEdit = () => {
        setEditedCab(null);
    };

    const saveEdit = (id, updatedCab) => {
        axios.put(`http://localhost:8070/cab/update/${id}`, updatedCab)
            .then(() => {
                alert("Item updated");
                // After update, you may want to update the state or refresh the data
                // Example: fetch updated data again
                axios.get("http://localhost:8070/cab")
                    .then(response => {
                        setCabs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                setEditedCab(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        
        <body>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '140px'}}>
            <div style={{ width: '90%' }}>
            <div class="home">
                <main class="table" id="cab_table">
                    <section class="table__header">
                        <h3>Package Details</h3>
                    </section>
                    <section class="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Time Period</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cabs.map(cab => (
                                    <tr key={cab._id}>
                                        <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.packageName} data-id={`${cab._id}-packageName`} /> : cab.packageName}</td>
                                        <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.description} data-id={`${cab._id}-description`} /> : cab.description}</td>
                                        <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.price} data-id={`${cab._id}-price`} /> : cab.price}</td>
                                        <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.timePeriod} data-id={`${cab._id}-timePeriod`} /> : cab.timePeriod}</td>
                                        <td>
                                            {editedCab === cab._id ? (
                                                <>
                                                    <button onClick={() => saveEdit(cab._id, { packageName: document.querySelector(`input[data-id="${cab._id}-packageName"]`).value, description: document.querySelector(`input[data-id="${cab._id}-description"]`).value, price: document.querySelector(`input[data-id="${cab._id}-price"]`).value, timePeriod: document.querySelector(`input[data-id="${cab._id}-timePeriod"]`).value })}>Save</button>
                                                    <button onClick={cancelEdit}>Cancel</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleEdit(cab._id)}>Edit</button>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteData(cab._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
            </div>
            </div>
            
        </body>
    );
};

export default CabTable;
