const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advertisementSchema = new Schema ({

    title : {

        type : String,
        required : true,
        maxlength: 100 
    },

    description : {

        type : String,
        required : true,
        maxlength: 500 
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
    },

    duration: {

        type : Number,
        required : true
    },

    publishDate: {

        type : Date, 
        required : true
    }
})

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;