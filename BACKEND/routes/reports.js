const express = require("express");
const router = express.Router(); 
const multer = require("multer"); // Import Multer for file uploads
const fs = require("fs"); // Import the 'fs' module for file operations
const path = require("path"); // Import the 'path' module for working with file paths
const Reports = require("../models/reports"); 

// Set up Multer storage configuration
const storage = multer.diskStorage({

  destination: "uploads/", // Destination folder for uploaded files
  
  filename: (req, file, cb) => {

    // Customize the filename (you can use a unique identifier here)
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  }
  
});

// Initialize Multer with the storage configuration
const upload = multer({ storage})

// Create a new payment report
router.route("/add").post(upload.single('document'), async (req, res) => {
  const { paymentType, department, date, time } = req.body;
  const document = req.file.path; // Path to the uploaded file

  const newReport = new Reports({
    paymentType,
    department,
    date,
    time,
    document

  });

  await newReport.save().then(() => {
      res.json("Payment Report Added");

    }).catch((err) => {

      console.error(err);
      res.status(500).json({ error: "Error adding payment report" });
    });
});

// Download a payment report document
router.route("/download/:id").get(async (req, res) => {
  const userId = req.params.id;

  try {
    const report = await Reports.findById(userId);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const filePath = report.document;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ error: "File not found" });
      }

      // Set the appropriate headers for file download
      res.set({
        "Content-Type": "application/pdf", // Set the correct MIME type based on your file type
        "Content-Disposition": `attachment; filename="${report.paymentType}.pdf"`, // Set the filename for download
      });

      // Create a readable stream from the file and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error downloading payment report", message: err.message });
  }
});

// Read all payment reports
router.route("/").get((req, res) => {

  Reports.find().then((reports) => {
      res.json(reports);
    }).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching payment reports" });
    });

});

// Update a payment report
router.route("/update/:id").put(upload.single("document"), async (req, res) => {
  const userId = req.params.id;
  const { paymentType, department, date, time } = req.body;
  const document = req.file ? req.file.path : req.body.document; // Use uploaded file path or existing document path

  const reportUpdate = {
    paymentType,
    department,
    date,
    time,
    document,
  };

  try {
    await Reports.findByIdAndUpdate(userId, reportUpdate);
    res.status(200).json({ status: "Payment report updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error updating data", error: err.message });
  }
});


//delete
router.route("/delete/:id").delete(async (req, res) => {

    let userId = req.params.id;

    await Reports.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Payment Report Deleted"});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete report", error: err.message});
    })

})

//fetch data only one user
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const report = await findOne(userId).then((repDetail) => {
        res.status(200).send({status: "Payment report fetched", repDetail})

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment report", error: err.message});
    })
})

// Export the router
module.exports = router;
