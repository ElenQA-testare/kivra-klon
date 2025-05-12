const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Required to check and create directories
const Document = require('../models/Document');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// 📁 Ensure that the uploads directory exists, and create it if it doesn't
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists, including parent dirs if needed
}

// 📥 Multer configuration for storing uploaded files in the "uploads/" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store files in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Make the filename unique by adding a timestamp
  },
});

const upload = multer({ storage });

// 📤 POST /documents/upload - Upload document to the server
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const document = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: `uploads/${req.file.filename}`, // Path where file is stored
      uploadedBy: req.userId,
      read: false,  // Default to unread
    });

    await document.save();
    res.status(201).json({ message: '✅ Dokument uppladdat!', document });
  } catch (err) {
    console.error(' Fel vid uppladdning:', err.message);
    res.status(500).json({ error: 'Fel vid uppladdning', details: err.message });
  }
});

// 📂 GET /documents - List all documents uploaded by the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const filter = { uploadedBy: req.userId };

    // If the query parameter 'read' is false, only fetch unread documents
    if (req.query.read === 'false') {
      filter.read = false;
    }

    const documents = await Document.find(filter).sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error(' Fel vid hämtning av dokument:', err.message);
    res.status(500).json({ error: 'Fel vid hämtning av dokument', details: err.message });
  }
});

// 🗑️ DELETE /documents/:id - Delete a document
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    await document.deleteOne();
    res.json({ message: '🗑️ Dokument raderat!' });
  } catch (err) {
    console.error(' Fel vid radering av dokument:', err.message);
    res.status(500).json({ error: 'Fel vid radering', details: err.message });
  }
});

module.exports = router;
