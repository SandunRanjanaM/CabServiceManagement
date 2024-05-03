const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();


storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"uploads/");
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single("file");

router.post("/fileUpload", upload, async (req, res) =>{
  try{
      return res.
      status(200).json
      ({
          success:true, 
          url:req.file.path,
          fileName:req.file.filename,
      });
  }catch(error){
      return res.status(500).json({success: false,error});
  }

});
module.exports =router;