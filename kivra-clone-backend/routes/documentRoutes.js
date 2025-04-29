const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer-konfiguration för att ladda upp filer till "uploads/" mappen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 📥 Ladda upp dokument
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const document = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.userId,
    });

    await document.save();
    res.status(201).json({ message: '✅ Dokument uppladdat!', document });
  } catch (err) {
    console.error('❌ Fel vid uppladdning:', err.message);
    res.status(500).json({ error: 'Fel vid uppladdning', details: err.message });
  }
});

// 📂 Lista alla dokument för inloggad användare
router.get('/', authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({ uploadedBy: req.userId });
    res.json(documents);
  } catch (err) {
    console.error('❌ Fel vid hämtning av dokument:', err.message);
    res.status(500).json({ error: 'Fel vid hämtning av dokument', details: err.message });
  }
});

// 🗑️ Radera ett dokument
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    await document.deleteOne();
    res.json({ message: '🗑️ Dokument raderat!' });
  } catch (err) {
    console.error('❌ Fel vid radering av dokument:', err.message);
    res.status(500).json({ error: 'Fel vid radering', details: err.message });
  }
});

module.exports = router;
