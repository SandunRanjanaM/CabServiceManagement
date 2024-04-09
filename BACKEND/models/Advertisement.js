const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advertisementSchema = new Schema ({

    title : {

        type : String,
        required : true
    },

    description : {

        type : String,
        required : true
    },

    content: {
        type: [String], // Store paths of uploaded images in an array
        required: true
    }
})

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;