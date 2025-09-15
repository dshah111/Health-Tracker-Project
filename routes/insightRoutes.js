const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getTrends } = require('../controllers/insightController');

const router = express.Router();

// Protect all routes with JWT
router.use(authMiddleware);

// GET /api/insights → return trends (avg sleep, avg calories, etc.)
router.get('/', getTrends);

module.exports = router;
