const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');


storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"uploads/");
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}-${file.originalname}`);
  }
}, );

const upload = multer({ storage }).single("file");

router.post("/fileUpload/:id", upload, async (req, res) =>{
  try{
      const updatingCab = await Cab.findById(req.params.id);
      if(!updatingCab) {
        return res.status(404).json({
          success:false,
          message:"Failed to find the cab"
        });
      }
      
      updatingCab.content.push(req.file.path);
      await updatingCab.save();

      return res.
      status(200).json
      ({
          success:true, 
          url:req.file.path,
          fileName:req.file.filename,
      });
  }catch(error){
      return res.status(500).json({success: false,error: error});
  }

});
module.exports =router;