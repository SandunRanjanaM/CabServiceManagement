const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const CustomerSchema =new Schema({

    name :{
        type :String,
        required: true
    },
    age:{
        type: Number,
        required:true
    },
    Gender:{
        type: String,
        required:true
    },
    Address:{
        type: String,
        required:true
    },
    
    Type:{
        type: String,
        required:true
    },



})
const Customer = mongoose.model("Customer",CustomerSchema);
module.exports=Customer;