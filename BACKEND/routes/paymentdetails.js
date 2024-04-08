const router = require("express").Router();
let paymentDetails = require("../models/paymentdetails");
//let paymentdetails = require("../models/paymentdetails");

//create 
router.route("/add").post((req,res)=>{

    const paymentId = req.body.paymentId;
    const paymentType = req.body.paymentType;
    const amount = Number(req.body.amount);
    const paymentDescription = req.body.paymentDescription;

    const newPayment = new paymentDetails({
        paymentId,
        paymentType,
        amount,
        paymentDescription
    })

    newPayment.save().then(()=>{
        res.json("Payment Detail Added")

    }).catch((err)=>{
        console.log(err);
    })

})

//read,get,fetch all data
router.route("/").get((req,res)=>{

    paymentDetails.find().then((paymentdetails)=>{
        res.json(paymentdetails)

    }).catch((err)=>{
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async (req, res) => {
     
    let userId = req.params.id;
    const {paymentId, paymentType, amount, paymentDescription} = req.body;

    const updatePaymentDetail = {
        paymentId,
        paymentType, 
        amount,
        paymentDescription
    }

    const update = await paymentDetails.findByIdAndUpdate(userId, updatePaymentDetail).then(()=> {
        //res.status(200).send({status: "Payment detail updated"})
        res.status(200).send({status: "Payment detail updated"})
        
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })

}) 

//delete
router.route("/delete/:id").delete(async (req,res) => {

    let userId = req.params.id;

    await paymentDetails.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Payment Deleted"});

    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

//fetch data only one user
router.route("/get/:id").get(async (req, res) => {

    let userId = req.params.id;

    const payment = await paymentDetails.findById(userId).then((paydetail) => {
        res.status(200).send({status: "Payment fetched", paydetail})

    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment details", error: err.message});
    })
})


module.exports = router;