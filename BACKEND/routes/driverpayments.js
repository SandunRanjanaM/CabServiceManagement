const router = require("express").Router();
let driverPayments = require("../models/driverpayments");

//create
router.route("/add").post((req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const date = req.body.date;
    const amount = Number(req.body.amount);
    const companycommission = Number(req.body.companycommission);
    const finalsalary = Number(req.body.finalsalary);

    const newdriverpayment = new driverPayments({
        name,
        email,
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
    const {name, email, date, amount, companycommission, finalsalary} = req.body;

    const updateDriverPayments = {
        name,
        email,
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

//search
router.route("/search").get(async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Email parameter is required for search" });
        }
        const driverpayment = await driverPayments.find({ email: email });
        res.json(driverpayment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error searching driver payment", message: error.message });
    }
});

module.exports = router;