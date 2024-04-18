import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllPaymentDetails() {

    const [paymentdetails, setPayments] = useState([]);

    useEffect(() => {
        function getPayments() {
            axios.get("http://localhost:8070/paymentdetails/").then((res) => {
                console.log(res.data);
                setPayments(res.data);

            //if it wasn't successfully fetched, then the error is displayed and handled as an exception.    
            }).catch((err) => {
                alert.apply(err.message);
            })
        }

        //Invoke the function once its implemented.
        getPayments();


    }, [])


    return (
        <div>
            <h1>All Payment Details</h1>
               <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Description</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </table>
        </div>

    )
}
