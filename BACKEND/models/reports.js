const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({

    paymentType : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    document: {
        type: Buffer, // Assuming you want to store the file as binary data
        required: false
    }

})

const Reports = mongoose.model("Reports", reportSchema);

module.exports = Reports;