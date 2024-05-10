const router = require("express").Router();
let Trip = require("../models/Trip");

router.route("/addTrip").post((req,res)=>{
    const {
        Firstname,
        Lastname,
        Address,
        ContactNo,
        Destination,
        VisitingPlaces,
        NumberOfPassengers,
        VehicleType,
        date,
        time,
        distance
    } = req.body;

    const newTrip= new Trip({
        Firstname,
        Lastname,
        Address,
        ContactNo,
        Destination,
        VisitingPlaces,
        NumberOfPassengers,
        VehicleType,
        date,
        time,
        distance
    });
    newTrip.save()
        .then(()=>{
            res.json("Trip Added")
        }).catch((err)=>{
            console.log(err)
        })
        
    });

router.route("/").get((req,res)=>{
    Trip.find()
        .then((trips)=>{
             res.json(trips)
    }).catch((err)=>{
        console.log(err);
    })
});
router.route("/update/:id").put(async (req, res) => {
    try {
        const tripId = req.params.id;
        const updateTrip = req.body;
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, updateTrip, { new: true });

        if (!updatedTrip) {
            return res.status(404).json({ status: "Trip not found" });
        }

        res.status(200).json({ status: "Trip updated", trip: updatedTrip });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating trip", error: err.message });
    }
});
router.route("/delete/:id").delete(async(req,res) => {
    let tripId = req.params.id;

    await Trip.findByIdAndDelete(tripId).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete trip", error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let tripId = req.params.id;
    try{
    console.log("Fetching trip details for ID:", tripId);
    const trip = await Trip.findById(tripId);
    if (!trip) {
        return res.status(404).send({ status: "Trip not found" });
      }
      console.log("Trip details fetched:", trip);
      res.status(200).send({ status: "Trip fetched", trip: trip });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting trip", error: err.message });
    }
});
module.exports = router;