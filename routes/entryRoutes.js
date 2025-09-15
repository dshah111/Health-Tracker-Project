const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addEntry, getEntries, updateEntry, deleteEntry } = require('../controllers/entryController');
const { validateEntry } = require('../middleware/validationMiddleware');


const router = express.Router();

router.use(authMiddleware);

router.post('/', validateEntry, addEntry);
router.get('/', getEntries);
router.put('/:id', validateEntry, updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;
