import React from "react";
import { Link } from "react-router-dom";


function Payments() {

    return (
        <div>
            <div className="container" style={{ textAlign: 'center', color:'white' }}>
            <p class="h1">Manage Payments</p>
            <hr></hr>
            <div className="d-grid gap-2 col-6 mx-auto" >
            <Link to="/addpaydetails" className="btn btn-secondary">Add Payment Details</Link>
            <Link to="/allpaydetails" className="btn btn-secondary">All Payment Details</Link>
            <Link to="/adddriverpayment" className="btn btn-secondary">Calculate Driver Payments</Link>
            <Link to="/alldriverpayments" className="btn btn-secondary">All Driver Payments</Link>
            </div>
            </div>
        </div>
    )

}

export default Payments;

