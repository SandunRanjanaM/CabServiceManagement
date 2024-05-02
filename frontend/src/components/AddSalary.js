import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css'; // Import the Login.css file

export default function AddSalary() {
    const [Emp_ID, setEmp_ID] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // Changed variable name
    const [Month, setMonth] = useState("");
    const [Worked_Days, setWorked_Days] = useState("");
    const [Basic_Salary, setBasic_Salary] = useState("");
    const [Final_Salary, setFinal_Salary] = useState("");

    useEffect(() => {
        // Set the current date when the component mounts
        const currentDate = new Date().toISOString().split('T')[0];
        setSelectedDate(currentDate); // Changed to setSelectedDate
    }, []);

    function calculateFinalSalary(workedDays, basicSalary) {
        return workedDays * basicSalary;
    }

    function handleWorkedDaysChange(e) {
        setWorked_Days(e.target.value);
        const finalSalary = calculateFinalSalary(e.target.value, Basic_Salary);
        setFinal_Salary(finalSalary);
    }

    function handleBasicSalaryChange(e) {
        setBasic_Salary(e.target.value);
        const finalSalary = calculateFinalSalary(Worked_Days, e.target.value);
        setFinal_Salary(finalSalary);
    }

    function sendData(e){
        e.preventDefault();

        const newSalary = {
            Emp_ID,
            Date: selectedDate,
            Month,
            Worked_Days,
            Basic_Salary,
            Final_Salary
        }

        axios.post("http://localhost:8070/salary/add", newSalary).then(()=>{
            alert("Salary Added");
            setEmp_ID("");
            setMonth("");
            setWorked_Days("");
            setBasic_Salary("");
            setFinal_Salary("");
            window.location.href = "/salary/update";
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <div className="login-container-2">
            <div style={{textAlign:"center"}}>
            <h3>Add Employee Salary</h3>
            <br/>
            </div>
            <div className="container">
                <form onSubmit={sendData} className="login-form">
                    <div className="form-group">
                        <label htmlFor="Emp_ID">Employee ID</label>
                        <input type="text" className="form-control" id="Emp_ID" placeholder="Enter Employee ID" required onChange={(e) => { setEmp_ID(e.target.value); }}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Date">Date</label>
                        <input type="date" className="form-control" id="Date" value={selectedDate} readOnly /> {/* Changed to selectedDate */}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Month">Month</label>
                        <select className="form-select" aria-label="Default select example" onClick={(e) => { setMonth(e.target.value); }} required >
                            <option disabled selected style={{color: "#999"}}>Select month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Worked_Days">Employee Worked Days</label>
                        <input type="number" className="form-control" id="Worked_Days" placeholder="Enter the number of worked days'" required value={Worked_Days} onChange={handleWorkedDaysChange}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Basic_Salary">Employee Basic Salary (per day)</label>
                        <input type="number" className="form-control" id="Basic_Salary" required placeholder="Enter the basic salary per a day to this employee" value={Basic_Salary} onChange={handleBasicSalaryChange} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Final_Salary">Employee Final Salary</label>
                        <input type="number" className="form-control" id="Final_Salary" required value={Final_Salary} readOnly />
                    </div>
                    
                    
                    <div className="form-group" style={{textAlign:"center"}}>
                        <button type="submit" className="btn btn-primary">
                            Add Employee Salary
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
