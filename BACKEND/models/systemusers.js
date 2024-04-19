const { Schema, model } = require('mongoose');


const mongoose = require('mongoose');

const Shema = mongoose.Schema;


//definning attributes
const SysUserSchema = new Schema({

    Emp_ID:{
        type : String,
        required : true
    },


    name:{
        type : String,
        required :true
    },

    password:{
        type : String,
        required : true
    },

    phone_number:{
        type: Number,
        required: true
    },

    address:{
        type : String,
        required : true
    },

    Emp_Type:{
        type : String,
        required: true
    }


})

const systemusers = mongoose.model("systemusers",SysUserSchema);

module.exports = systemusers;