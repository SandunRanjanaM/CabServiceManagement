const router = require("express").Router();
let Advertisement = require("../models/Advertisement");
const multer = require("multer");
//import file system.
const fs = require('fs');

//multer has option called disk storage.2 parameters --> destination and file name.
//First we save the images in the computer, and then move it to MongoDB
const storage = multer.diskStorage({
    //creates a folder called uploads and stores the files in it.
     destination:(req,file,cb)=>{
     //cb is the callback.
     cb(null,'uploads')
     },
     filename:(req,file,cb) => {
         //since we could receive multiple files, we are going to store it with the original name.
         const {originalname} = file;
         cb(null,file.originalname);
     },
 });
 
//Specify the storage as multer storage
const upload = multer({
    //Specify the storage as our "Storage" that we created.
    storage:storage
//since we are uploading files one by one, we have to make use of "single".
//we are going to upload images using this name (testImage).
//since we are uploading files one by one, should make use of "single"
})


router.route("/add").post(upload.single('content'), (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const content = req.file;

    const newAdvertisement = new Advertisement({

        title,
        description,
        content: {

            data: Buffer.from(fs.readFileSync(content.path)),
            contentType: content.mimetype
        }
    })

    newAdvertisement.save().then(() => {

        res.json("Advertisement Added")
    }).catch((err) => {

        console.log(err);
    })
})

router.route("/").get((req, res) => {

    Advertisement.find().then((advertisements) => {

        res.json(advertisements)
    }).catch((err) => {

        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {

    let adId = req.params.id;
    const {title, description, content} = req.body;

    const updateAdvertisement = {

        title,
        description,
        content: {

            data: Buffer.from(fs.readFileSync(content.path)),
            contentType: content.mimetype
        }
    }

    const update = await Advertisement.findByIdAndUpdate(adId, updateAdvertisement).then(() => {

        res.status(200).send({status : "Advertisement Updated"})
    }).catch((err) => {

        console.log(err);
        res.status(500).send({status : "Error with updating advertisement", error : err.message});
    })
})

router.route("/delete/:id").delete(async (req, res) => {

    let adId = req.params.id;

    await Advertisement.findByIdAndDelete(adId).then(() => {

        res.status(200).send({status : "Advertisement Deleted"});
    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status : "Error with deleting advertisement", error : err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {

    let adId = req.params.id;

    const ad = await Advertisement.findById(adId).then((advertisement) => {

        res.status(200).send({status : "Advertisement Fetched", advertisement});
    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status : "Error with fetching advertisement", error : err.message});
    })
})

module.exports = router;