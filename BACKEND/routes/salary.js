const router = require("express").Router();

let salary = require("../models/salary");


//access attributes in model and add to database
router.route("/add").post((req,res)=>{

    const Emp_ID = req.body.Emp_ID;
    const Date = req.body.Date;
    const Month = req.body.Month;
    const Worked_Days = Number(req.body.Worked_Days);
    const Basic_Salary = Number(req.body.Basic_Salary);
    const Final_Salary = Number(req.body.Final_Salary);
    

    const newSalary = new salary({
        Emp_ID,
        Date,
        Month,
        Worked_Days,
        Basic_Salary,
        Final_Salary
    })


    newSalary.save().then(()=>{
        res.json("Salary added")
    }).catch((err)=>{
        console.log(err);
    })

})


//getting database data
router.route("/").get((req,res)=>{

    salary.find().then((salary)=>{
        res.json(salary)
    }).catch((err)=>{
        console.log(err)
    })
    
})



//updating data

router.route("/update/:id").put(async (req, res) => {
    try {
        const userId = req.params.id;
        const { Emp_ID, Date, Month, Worked_Days, Basic_Salary, Final_Salary } = req.body;

        const updateSal = {
            Emp_ID,
            Date,
            Month,
            Worked_Days,
            Basic_Salary,
            Final_Salary
        }

        const updatedSalary = await salary.findByIdAndUpdate(userId, updateSal, { new: true });

        if (!updatedSalary) {
            return res.status(404).send({ status: "Error", message: "Salary not found" });
        }

        res.status(200).send({ status: "Salary Updated", updatedSalary });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with updating", error: err.message });
    }
})


//delete user

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await salary.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", erroe: err.message});
    })
})


//getting only one user

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    await salary.findById(userId).then((salary) => {
        res.status(200).send({status: "User fetched", salary})
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})


module.exports = router;