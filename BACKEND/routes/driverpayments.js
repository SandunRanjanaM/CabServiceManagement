const router = require("express").Router();
let driverPayments = require("../models/driverpayments");

//create
router.route("/add").post((req, res) => {
    
    const name = req.body.name;
    const date = req.body.date;
    const amount = Number(req.body.amount);
    const companycommission = Number(req.body.companycommission);
    const finalsalary = Number(req.body.finalsalary);

    const newdriverpayment = new driverPayments({
        name,
        date,
        amount,
        companycommission,
        finalsalary
    })

    newdriverpayment.save().then(() => {
        res.json("Driver payment added")

    }).catch((err) => {
        console.log(err);

    })

})

//read
router.route("/").get((req, res) => {

    driverPayments.find().then((driverpayments) => {
        res.json(driverpayments)

    }).catch((err) => {
        console.log(err)

    })

})

//update
router.route("/update/:id").put(async (req, res) => {

    let userId = req.params.id;
    const {name, date, amount, companycommission, finalsalary} = req.body;

    const updateDriverPayments = {
        name,
        date,
        amount,
        companycommission,
        finalsalary
    }

    const update = await driverPayments.findByIdAndUpdate(userId, updateDriverPayments).then(() => {
        res.status(200).send({status: "Driver payment updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});

    })

})

//delete
router.route("/delete/:id").delete(async (req, res) => {

    let userId = req.params.id;

    await driverPayments.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Driver Payment Deleted"});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete driver payment", error: err.message});

    })

})

//fetch
router.route("/get/:id").get(async (req, res) => {

    let userId = req.params.id;

    const driverpayment = await driverPayments.findById(userId).then((driverPay) => {
        res.status(200).send({status: "Driver payment fetched", driverPay})

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment details", error: err.message});

    })
})

module.exports = router;