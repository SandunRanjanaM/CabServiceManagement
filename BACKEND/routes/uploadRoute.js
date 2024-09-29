const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer upload middleware
const upload = multer({ storage }).single("file");

// POST route to handle file upload
router.post("/fileUpload/:id", upload, async (req, res) => {
  try {
    const updatingCab = await Cab.findById(req.params.id);
    if (!updatingCab) {
      return res.status(404).json({
        success: false,
        message: "Failed to find the cab"
      });
    }

    // Push the file path to the content array of the cab
    updatingCab.content.push(req.file.path);
    await updatingCab.save();

    // Construct the response object with file URLs
    const fileUrl = `${req.protocol}://${req.get("host")}${req.file.path}`;

    // Respond with success message and file details
    return res.status(200).json({
      success: true,
      url: fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ success: false, error: error });
  }
});

// GET route to fetch all images
router.get('/getAllImages', async (req, res) => {
  try {
    // Fetch all documents from the Cab collection
    const cabs = await Cab.find();

    // Initialize an array to store image URLs
    let imageUrls = [];

    // Loop through each document
    cabs.forEach(cab => {
      // Check if the document has content
      if (cab.content && cab.content.length > 0) {
        // Loop through each image URL in the content array
        cab.content.forEach(imageUrl => {
          // Construct the URL for serving the image statically
          const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(imageUrl)}`;
          // Push the image URL to the array
          imageUrls.push({ url: fileUrl });
        });
      }
    });

    // Send the array of image URLs as the response
    return res.status(200).json(imageUrls);
  } catch (error) {
    // Handle errors
    console.error('Error fetching uploaded images:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
