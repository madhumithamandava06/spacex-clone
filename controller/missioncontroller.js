const Mission = require('../models/Mission');

exports.createMission = async (req, res) => {

    try {

        const {
            missionName,
            rocket,
            launchDate,
            destination,
            status,
            description,
            missionImage
        } = req.body;

        if (
            !missionName ||
            !rocket ||
            !launchDate ||
            !destination ||
            !status ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const mission = await Mission.create({
            missionName,
            rocket,
            launchDate,
            destination,
            status,
            description,
            missionImage
        });

        res.status(201).json({
            message: "Mission Added Successfully",
            data: mission
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.getAllMissions = async (req, res) => {

    try {

        const {
            search,
            destination,
            status,
            page = 1,
            limit = 5
        } = req.query;

        let filter = {};

        if (search) {
            filter.missionName = {
                $regex: search,
                $options: "i"
            };
        }

        if (destination) {
            filter.destination = destination;
        }

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const missions = await Mission.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Mission.countDocuments(filter);

        res.status(200).json({
            message: "Missions Fetched Successfully",
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: missions
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
const mongoose = require('mongoose');

exports.getMissionById = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Mission ID"
            });
        }

        const mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({
                message: "Mission Not Found"
            });
        }

        res.status(200).json({
            message: "Mission Fetched Successfully",
            data: mission
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.updateMission = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Mission ID"
            });
        }

        const mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({
                message: "Mission Not Found"
            });
        }

        const updatedMission = await Mission.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Mission Updated Successfully",
            data: updatedMission
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.deleteMission = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Mission ID"
            });
        }

        const mission = await Mission.findById(req.params.id);

        if (!mission) {
            return res.status(404).json({
                message: "Mission Not Found"
            });
        }

        await Mission.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Mission Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};