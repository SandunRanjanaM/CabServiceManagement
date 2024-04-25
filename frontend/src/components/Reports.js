import React from "react";
import { Link } from "react-router-dom";


function Reports() {

    return (
        <div>
            <div className="container" style={{ textAlign: 'center', color:'white' }}>
            <p className="h1">Manage Payment Reports</p>
            <hr></hr>
            <div className="d-grid gap-2 col-6 mx-auto" style={{ textAlign: 'center' }}>
            <Link to="/addreports" className="btn btn-secondary">Add Payment Report</Link>
            <Link to="/allreports" className="btn btn-secondary">All Payment Reports</Link>
            
            </div>
            </div>
        </div>
    )

}

export default Reports;

