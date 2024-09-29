import React, { useState } from 'react';

function CounterFunction() {
  // Declare a new state variable, which we'll call "count"
let [count, setCount] = useState(0);

function increment(){
    setCount(++count)

}

  return (
    <div>
     <h3>functionnal components</h3>
     <h1>Counter  ={count}</h1>
     <button onClick={e => increment()}>Increment</button>
    </div>
  );
}
 export default CounterFunction;