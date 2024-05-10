const router = require("express").Router();
let paymentDetails = require("../models/paymentdetails");

//create 
router.route("/addpaydetails").post((req,res)=>{

    const name = req.body.name;
    const date = Date(req.body.date);
    const paymentType = req.body.paymentType;
    const amount = Number(req.body.amount);
    const paymentDescription = req.body.paymentDescription;

    const newPayment = new paymentDetails({
        //paymentId,
        name,
        date,
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
router.route("/allpaydetails").get((req,res)=>{

    paymentDetails.find().then((paymentdetails)=>{
        res.json(paymentdetails)

    }).catch((err)=>{
        console.log(err)
    })
})

//update
router.route("/updatepaydetails/:id").put(async (req, res) => {
     
    let userId = req.params.id;
    const { paymentType, amount, paymentDescription} = req.body;

    const updatePaymentDetail = {
        //paymentId,
        paymentType, 
        amount,
        paymentDescription
    }

    const update = await paymentDetails.findByIdAndUpdate(userId, updatePaymentDetail).then(()=> {
        res.status(200).send({status: "Payment detail updated"})
        
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })

}) 

//delete
router.route("/deletepaydetails/:id").delete(async (req,res) => {

    let userId = req.params.id;

    await paymentDetails.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Payment Deleted"});

    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

//fetch data only one user
router.route("/getpaydetails/:id").get(async (req, res) => {
    try {
        let userId = req.params.id;
        const payment = await paymentDetails.findById(userId);
        if (!payment) {
            return res.status(404).send({ status: "Error", message: "Payment not found" });
        }
        res.status(200).send({ status: "Payment fetched", payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error", message: "Error with fetching payment details" });
    }
});


module.exports = router;