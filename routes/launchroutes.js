const express = require('express');
const router = express.Router();

const {
    createLaunch,
    getAllLaunches,
    getLaunchById,
    updateLaunch,
    deleteLaunch
} = require('../controller/launchcontroller');

const authMiddleware = require('../middleware/authmiddleware');

router.post('/launches', authMiddleware, createLaunch);

router.get('/launches', getAllLaunches);

router.get('/launches/:id', getLaunchById);

router.put('/launches/:id', authMiddleware, updateLaunch);

router.delete('/launches/:id', authMiddleware, deleteLaunch);

module.exports = router;