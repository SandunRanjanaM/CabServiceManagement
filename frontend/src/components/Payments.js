import React from "react";
import { Link } from "react-router-dom";


function Payments() {

    return (
        <div>
            <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/add" className="btn btn-primary">Add Payment Details</Link>
            <button className="btn btn-primary" type="button">Driver's Payment Calculation</button>
            </div>
        </div>
    )

}

export default Payments;

