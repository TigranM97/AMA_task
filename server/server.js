const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");
const xml2js = require("xml2js");
const {
  checkReferencesCSV,
  checkEndBalanceCSV,
  checkExtention,
  checkReferencesXML,
  transformKeysToLowercase,
} = require("./util");
const { checkEndBalanceXML } = require("./util");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/validate", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(__dirname, req.file.path);
  const extention = checkExtention(req.file.mimetype);
  if (extention === "csv") {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        const failedRecords1 = checkReferencesCSV(results);
        const failedRecords2 = checkEndBalanceCSV(results);
        const resultRecords = transformKeysToLowercase([
          ...failedRecords1,
          ...failedRecords2,
        ]);
        res.status(200).json(resultRecords);
      })
      .on("error", (err) => {
        console.error("Error parsing CSV:", err);
        res.status(500).send("Error parsing CSV.");
      });
  } else if (extention === "xml") {
    const xmlData = fs.readFileSync(filePath, "utf8");
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        res.status(500).send("Error parsing XML.");
        return;
      }
      const records = result.records.record;
      const failedRecords1 = checkReferencesXML(records);
      const failedRecords2 = checkEndBalanceXML(records);
      const resultRecords = transformKeysToLowercase([
        ...failedRecords1,
        ...failedRecords2,
      ]);
      res.status(200).json(resultRecords);
    });
  } else {
    res.status(400).send("Unsupported file format.");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
