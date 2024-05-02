const { Schema, model } = require('mongoose');


const mongoose = require('mongoose');



//definning attributes
const SalarySchema = new Schema({

    Emp_ID:{
        type : String,
        required : true
    },
    Date:{
        type : Date,
        required : true
    },

    Month:{
        type: String,
        required:true
    },

    Worked_Days:{
        type : Number,
        required :true
    },

    Basic_Salary:{
        type : Number,
        required : true
    },

    Final_Salary:{
        type: Number,
        required: true
    },
    

})

const salary = mongoose.model("salary",SalarySchema);

module.exports = salary;