const express = require('express');
const router = express.Router();
const {
    createRocket,
    getAllRockets,
    getRocketById,
    updateRocket,
    deleteRocket
} = require('../controller/rocketcontroller');

const authMiddleware = require('../middleware/authmiddleware');

router.post('/rockets', authMiddleware, createRocket);
router.get('/rockets', getAllRockets);
router.get('/rockets/:id', getRocketById);
router.put('/rockets/:id', authMiddleware, updateRocket);
router.delete('/rockets/:id', authMiddleware, deleteRocket);

module.exports = router;