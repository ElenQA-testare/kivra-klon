const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Document = require("../models/Document");
const auth = require('../middleware/authMiddleware');


// 📁 Konfiguration för Multer – var filerna sparas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

//
// 📤 POST /documents/upload – ladda upp fil
//
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const document = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: `uploads/${req.file.filename}`,
      uploadedBy: req.userId,
      read: false, // 🔴 standard: oläst
    });

    await document.save();
    res.status(201).json({ message: "Dokument sparat", document });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Fel vid uppladdning" });
  }
});

//
// 📄 GET /documents – hämta dokument (valfritt filter read=false)
//
router.get("/", auth, async (req, res) => {
  try {
    const filter = { uploadedBy: req.userId };

    if (req.query.read === "false") {
      filter.read = false;
    }

    const documents = await Document.find(filter).sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Kunde inte hämta dokument" });
  }
});

//
// ✅ (Valfritt) PATCH /documents/:id/read – markera dokument som läst
//
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const doc = await Document.findOneAndUpdate(
      { _id: req.params.id, uploadedBy: req.userId },
      { read: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: "Dokument hittades inte" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Kunde inte uppdatera dokument" });
  }
});

module.exports = router;
