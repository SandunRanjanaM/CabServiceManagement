const express = require("express");
const router = express.Router(); 
const fs = require("fs"); 
const path = require("path"); 
const Reports = require("../models/reports");
const app = express();
app.use("files", express.static("document")); 

//multer-------------------------------------------
const multer = require("multer"); 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname); // Corrected to use 'file.originalname'
}

})

const upload = multer({ storage: storage })

// Create a new payment report
router.post("/addpayreports", upload.single("document"), async (req, res) => {
  console.log(req.file); // Change from req.document to req.file
  const { paymentType, department, date } = req.body;
  const documentPath = req.file.path;

  const newReport = new Reports({
      paymentType,
      department,
      date,
      document: documentPath
  });

  try {
      await newReport.save();
      res.json({ message: "Payment Report Added" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding payment report" });
  }
});

// Download a payment report document
router.get("/download/:id", async (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid ID format" });
  }

  
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

      res.download(filePath, `${report.paymentType}.pdf`, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).json({ error: "Error downloading file" });
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error downloading payment report", message: err.message });
  }
});


// Read all payment reports
router.route("/allpayreports").get((req, res) => {

  Reports.find().then((reports) => {
      res.json(reports);
    }).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching payment reports" });
    });

});

// Update a payment report
router.route("/updatepayreports/:id").put(upload.single("document"), async (req, res) => {
  const userId = req.params.id;
  const { paymentType, department, date, time } = req.body;
  const document = req.file ? req.file.path : req.body.document; 

  const reportUpdate = {
    paymentType,
    department,
    date,
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
router.route("/deletepayreports/:id").delete(async (req, res) => {

    let userId = req.params.id;

    await Reports.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Payment Report Deleted"});

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete report", error: err.message});
    })

})

//fetch data only one user
router.route("/getpayreports/:id").get(async (req, res) => {
    let userId = req.params.id;

    const report = await findOne(userId).then((repDetail) => {
        res.status(200).send({status: "Payment report fetched", repDetail})

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get payment report", error: err.message});
    })
})


module.exports = router;
