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
    document: {
        type: String, 
        required: true
    }

})

const Reports = mongoose.model("Reports", reportSchema);

module.exports = Reports;