//const express = require("express");
const router = require("express").Router();
let Reports = require("../models/reports");

const multer = require("multer");
//require("fs");
//require("path");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files

//create
router.route("/add", upload.single("document")).post((req, res) => {

    //const reportId = req.body.reportId;
    const paymentType = req.body.paymentType;
    const department = req.body.department;
    const date = req.body.date;
    const time = req.body.time;
    const documentPath = req.file ? req.file.path : null;  // Path to the uploaded file
    
    const newReport = new Reports({
        //reportId,
        paymentType,
        department,
        date,
        time,
        document: documentPath // Store the file path in the document field

    })

    newReport.save().then(() => {
        res.json("Payment Report Added")

    }).catch((err)=>{
        console.log(err);
    })
})

//read
router.route("/").get((req, res) => {

    Reports.find().then((reports) => {
        res.json(reports)

    }).catch((err) => {
        console.log(err)
    })
})

//update
router.route("/update/:id", upload.single("document")).put(async(req, res) => {

    let userId= req.params.id;
    const {paymentType, department, date, time} = req.body;
    const documentPath = req.file ? req.file.path : null;  // Path to the updated document file

    const reportUpdate = {
        //reportId,
        paymentType,
        department,
        date,
        time,
        document: documentPath // Update the document path
    }

    const update = await Reports.findByIdAndUpdate(userId, reportUpdate).then(() => {
        res.status(200).send({status: "Payment report updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})

//delete
router.route("/delete/:id").delete(async (req, res) => {

    let userId = req.params.id;

    await Reports.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Payment Report Deleted"});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete report", error: err.message});
    })

})

//fetch data only one user
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const report = await findOne(userId).then((repDetail) => {
        res.status(200).send({status: "Payment report fetched", repDetail})

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment report", error: err.message});
    })
})

module.exports = router;
