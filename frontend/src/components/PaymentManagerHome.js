import React from "react";
import { Link } from "react-router-dom";



export default function PaymentManagerHome() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                        <h1 className="display-3">Payment Management</h1>
                        <figure className="text-end">
                            <blockquote className="blockquote">
                                <p>The most important part of any payment system is trust.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Manage Payment Details</h5>
                            <p className="card-text">View, edit, and process payments.</p>
                            <Link to="/all" className="btn btn-outline-primary">Go to Payment Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Manage Payment Reports</h5>
                            <p className="card-text">View, edit and add payment reports</p>
                            <Link to="/allreports" className="btn btn-outline-primary">Go to Payment Reports</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Driver Payments Calculation</h5>
                            <p className="card-text">Calculate, view, edit, remove driver payments</p>
                            <Link to="/alldriverpayments" className="btn btn-outline-primary">Go to Driver Payments</Link>
                            <Link to="/adddriverpayment" className="btn btn-outline-secondary">Add new driver payment</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}