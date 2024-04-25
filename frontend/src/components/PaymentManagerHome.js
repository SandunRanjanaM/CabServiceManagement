import React from "react";
import { Link } from "react-router-dom";



export default function PaymentManagerHome() {
    return (
        <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
        <div className="container" >
            <h1 class="display-3">Payment Management</h1>

            <figure class="text-end">
            <blockquote class="blockquote">
                <p>The most important part of any payment system is trust.</p>
            </blockquote>
            <figcaption class="blockquote-footer">
            Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
            </figcaption>
            </figure>

        </div>
        </div>
        
    )
}