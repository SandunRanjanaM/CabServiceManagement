const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const TripSchema=new Schema({
    Firstname : {
        type : String,
        required:[true,"Firstname is required"]
    },
    Lastname : {
        type : String,
        required:[true,"Lastname is required"]
    },
    Address: {
        type : String,
        required:[true,"Address is required"]
    },
    ContactNo: {
        type : String,
        required: [true,"ContactNo is required"],
    },
    Destination: {
        type:String,
        required:[true,"Destination is required"]
    },
    VisitingPlaces: {
        type:String,
        required: true
    },
    NumberOfPassengers: {
        type:Number,
        required: true
    },
    VehicleType: {
        type:String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    distance:{
        type: Number,
        required: true
    }
    }
);
const Trip = mongoose.model("Trip",TripSchema);

module.exports=Trip;