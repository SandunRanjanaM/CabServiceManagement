const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentdetailsSchema = new Schema({

    paymentType : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    paymentDescription : {
        type : String,
        required : true
    }
})

const paymentDetails = mongoose.model("paymentDetails", paymentdetailsSchema);

module.exports = paymentDetails;