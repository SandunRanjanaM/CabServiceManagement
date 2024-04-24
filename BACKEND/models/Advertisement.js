const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advertisementSchema = new Schema ({

    title : {

        type : String,
        required : true,
        maxlength: 100 // Example: Maximum 100 characters for the title
    },

    description : {

        type : String,
        required : true,
        maxlength: 500 // Example: Maximum 100 characters for the description
    },

    content: {
        type: [String], 
        required: true
    },

    email: {

        type : String,
        required : true
    },

    contact: {

        type : String,
        required : true
    },

    status: {
        
        type: String 

    },

    payment: {

        type: [String]
    }
})

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;