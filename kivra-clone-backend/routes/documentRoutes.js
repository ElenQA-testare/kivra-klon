const express = require('express');
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

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

// Routes
router.post('/upload', authMiddleware, upload.single('file'), documentController.uploadDocument);
router.get('/', authMiddleware, documentController.getDocuments);

module.exports = router;
