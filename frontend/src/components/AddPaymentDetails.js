import React, { useState } from "react";

export default function AddPaymentDetails() {


    return (

        <div className="container">
            <form>

                <legend>Enter Payment Details</legend>

            <div class="mb-3">
                <label for="paymentType" class="form-label">Payment Type</label>
                <input type="text" class="form-control" id="paymentType" placeholder="Enter payment type"></input>
            </div>

            <div class="mb-3">
                <label for="amount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="amount"></input>
            </div>

            <div class="mb-3">
                <label for="paymentDescription" class="form-label">Payment Description</label>
                <input type="text" class="form-control" id="paymentDescription" placeholder="Enter payment description"></input>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        
    )
}
