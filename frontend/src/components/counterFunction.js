//counterFunction.js
import React, { useState } from "react";

function CounterFunction() {
    // Initialize state for the counter
    const [number, setNumber] = useState(0);

    // Function to handle incrementing the counter
    const increment = () => {
        setNumber(number + 1);
    };

    return (
        <div>
            <h3>Functional Component</h3>
            <h1>Counter = {number}</h1>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default CounterFunction;
