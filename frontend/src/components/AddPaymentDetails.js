import React, { useState } from "react";
import axios from "axios";
import { Link, useParams} from "react-router-dom";


export default function AddPaymentDetails() {

    const { userId } = useParams();

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentDescription, setPaymentDescription] = useState("");
    


    function sendData(e) {
        e.preventDefault();
        
        const newPayment = {
            name,
            date,
            paymentType,
            amount,
            paymentDescription
        }

        axios.post("http://localhost:8070/paymentdetails/add", newPayment).then(() => {
            alert("Payment Detail Added Successfully")
            
            setName("");
            setDate("");
            setPaymentType("");
            setAmount("");
            setPaymentDescription("");


        }).catch((err) => {
            alert(err)
        })

    }

    const clearForm = () => {
        setName("");
        setDate("");
        setPaymentType("");
        setAmount("");
        setPaymentDescription("");
    }
    return (
       
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
            <form onSubmit={sendData} initialValues={{
                
            }}>

            <p className="h1" style={{ textAlign: 'center' }}>Add Payment Details</p>
            <hr></hr>
            
            <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" 
                onChange={(e) => {

                    setName(e.target.value);

                }}>
                </input>
            </div>

            <div className="mb-3">
                <label for="date" className="form-label">Date</label>
                <input type="date" className="form-control" id="date" placeholder="Enter date" 
                onChange={(e) => {

                    setDate(e.target.value);

                }}>
                </input>
            </div>

            <div className="mb-3">
                <label for="paymentType" className="form-label">Payment Type</label>
                <input type="text" className="form-control" id="paymentType" placeholder="Enter payment type" 
                onChange={(e) => {

                    setPaymentType(e.target.value);

                }}>
                </input>
            </div>

            <div className="mb-3">
                <label for="amount" className="form-label">Amount</label>
                <input type="number" className="form-control" id="amount" placeholder="Enter Amount" 
                onChange={(e) => {

                    setAmount(e.target.value);

                }}></input>
            </div>

            <div className="mb-3">
                <label for="paymentDescription" className="form-label">Payment Description</label>
                <input type="text" className="form-control" id="paymentDescription" placeholder="Enter payment description" 
                onChange={(e) => {

                    setPaymentDescription(e.target.value);

                }}></input>
            </div>

            
           
           
            <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
           
            <button type="button" class="btn btn-danger" onClick={clearForm}> Clear</button>
            <button type="reset" class="btn btn-warning">Reset</button>
            

            <p style={{textAlign:'center'}}>I want change something!!</p>
            <div class="d-grid gap-2 col-6 mx-auto">
            <Link to={`/udcuspayments/${userId}`} className="btn btn-outline-primary">Edit Payment</Link>
            </div>
            
            
            </form>
            </div>
        </div>
        
        
    )
}
