const express = require('express');
const router = express.Router();

const { createMission,getAllMissions,getMissionById,
    updateMission,
    deleteMission } = require('../controller/missioncontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.post('/missions', authMiddleware, createMission);
router.get('/missions', getAllMissions);
router.get('/missions/:id', getMissionById);
router.put('/missions/:id', authMiddleware, updateMission);
router.delete('/missions/:id', authMiddleware, deleteMission);

module.exports = router;