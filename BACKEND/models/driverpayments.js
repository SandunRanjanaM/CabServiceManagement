const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverpaymentsSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    companycommission : {
        type : Number,
        required : true
    },
    finalsalary : {
        type : Number,
        required : true
    }

})

const driverPayments = mongoose.model("driverPayments", driverpaymentsSchema);

module.exports = driverPayments;