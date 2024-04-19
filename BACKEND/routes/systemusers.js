const router = require("express").Router();

let systemusers = require("../models/systemusers");


//access attributes in model and add to database
router.route("/add").post((req,res)=>{

    const Emp_ID = req.body.Emp_ID;
    const name = req.body.name;
    const password = req.body.password;
    const phone_number = Number(req.body.phone_number);
    const address = req.body.address;
    const Emp_Type = req.body.Emp_Type;


    const newSystemUser = new systemusers({
        Emp_ID,
        name,
        password,
        phone_number,
        address,
        Emp_Type
    })


    newSystemUser.save().then(()=>{
        res.json("System user added")
    }).catch((err)=>{
        console.log(err);
    })

})


//getting database data
router.route("/").get((req,res)=>{

    systemusers.find().then((systemusers)=>{
        res.json(systemusers)
    }).catch((err)=>{
        console.log(err)
    })
    
})



//updating data

router.route("/update/:id").put(async(req,res) => {
    let userId = req.params.id;
    const {Emp_ID,name,password,phone_number,address,Emp_Type} = req.body;

    const updateEmp = {
        Emp_ID,
        name,
        password,
        phone_number,
        address,
        Emp_Type

    }

    const update = await systemusers.findByIdAndUpdate(userId,updateEmp).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error eith updating",error: err.message});
    })

    
})


//delete user

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await systemusers.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", erroe: err.message});
    })
})


//getting only one user

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    await systemusers.findById(userId).then((systemusers) => {
        res.status(200).send({status: "User fetched", systemusers})
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})


module.exports = router;