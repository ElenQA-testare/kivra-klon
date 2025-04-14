const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

// Multer-konfiguration för filuppladdning
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Ladda upp dokument
exports.uploadDocument = async (req, res) => {
    try {
        const document = new Document({
            userId: req.userId,
            filename: req.file.originalname,
            filepath: req.file.path,
        });
        await document.save();
        res.status(201).json({ message: 'Document uploaded successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Hämta användarens dokument
exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.userId });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};