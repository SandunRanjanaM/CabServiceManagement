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

    content : {

        data : Buffer,
        contentType : String
    }
})

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;