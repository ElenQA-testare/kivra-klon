// routes/uploadRoutes.js
// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Multer-konfiguration
const Document = require("../models/Document");
const path = require("path");
const fs = require("fs");

// 🔺 POST: Ladda upp ett dokument
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const doc = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.body.userId || null,
    });
    await doc.save();
    res.json({ message: "File uploaded successfully", doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔺 GET: Lista alla uppladdade dokument
router.get("/list", async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔻 GET: Ladda ner ett dokument med ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(__dirname, "../", doc.path);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    res.download(filePath, doc.originalname);
  } catch (err) {
    res.status(500).json({ error: "Error downloading file", details: err.message });
  }
});

// 🔻 DELETE: Radera ett dokument med ID
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(__dirname, "../", doc.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Radera fil från disk
    }

    await doc.deleteOne(); // Ta bort från databasen
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting file", details: err.message });
  }
});

module.exports = router;
