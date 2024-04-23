import React,{useState} from "react";
import axios from "axios";

export default function AddPackage(){

const[packageName,setpackageName] = useState("");
const[description,setdescription] = useState("");
const[price,setprice] = useState("");
const[timePeriod,settimePeriod] = useState("");

function sendData(e){
  e.preventDefault();
  
  const newPackage ={

    packageName,
    description,
    price,
    timePeriod
       
  }

  axios.post("http://localhost:8070/cab/add",newPackage).then(()=>{
    alert("Package Added")

  }).catch((err)=>{
    alert(err);
  })
 
}


    return(

        <div className="container">
     
<form onSubmit={sendData}>
  <div class="mb-1">
    <label for="pckageName" class="form-label">Package Name</label>
    <input type="text" class="form-control" id="pckageName" placeholder='Enter Package name'
    onChange={(e)=>{

      setpackageName(e.target.value);

    }}/>

  </div>
  <div class="mb-2">
    <label for="Description" class="form-label">Description</label>
    <input type="text" class="form-control" id="description" placeholder='Enter Package escription'
    onChange={(e)=>{

      setdescription(e.target.value);

    }}/>

  </div>
  <div class="mb-3">
    <label for="Price" class="form-label">Price</label>
    <input type="text" class="form-control" id="price" placeholder='Enter Package price'
    onChange={(e)=>{

      setprice(e.target.value);

    }}/>

  </div>
  <div class="mb-4">
    <label for="Duration" class="form-label">Duration</label>
    <input type="text" class="form-control" id="timePeriod" placeholder='Enter Package Duration'
    onChange={(e)=>{

      settimePeriod(e.target.value);

    }}/>

  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>

</div>

    )

}