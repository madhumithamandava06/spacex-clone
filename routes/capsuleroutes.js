const express = require('express');
const router = express.Router();

const {
    createCapsule,
    getAllCapsules,
    getCapsuleById,
    updateCapsule,
    deleteCapsule
} = require('../controller/capsulecontroller');

const authMiddleware = require('../middleware/authmiddleware');

router.post('/capsules', authMiddleware, createCapsule);

router.get('/capsules', getAllCapsules);

router.get('/capsules/:id', getCapsuleById);

router.put('/capsules/:id', authMiddleware, updateCapsule);

router.delete('/capsules/:id', authMiddleware, deleteCapsule);

module.exports = router;