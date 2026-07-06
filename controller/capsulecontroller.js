const Capsule = require('../models/Capsule');
const mongoose = require('mongoose');

exports.createCapsule = async (req, res) => {

    try {

        const {
            capsuleName,
            serialNumber,
            type,
            status,
            lastMission,
            crewCapacity,
            description
        } = req.body;

        if (
            !capsuleName ||
            !serialNumber ||
            !type ||
            !status ||
            !lastMission ||
            !crewCapacity ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const capsule = await Capsule.create({
            capsuleName,
            serialNumber,
            type,
            status,
            lastMission,
            crewCapacity,
            description
        });

        res.status(201).json({
            message: "Capsule Added Successfully",
            data: capsule
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getAllCapsules = async (req, res) => {

    try {

        const {
            search,
            type,
            status,
            page = 1,
            limit = 5
        } = req.query;

        let filter = {};

        if (search) {
            filter.capsuleName = {
                $regex: search,
                $options: "i"
            };
        }

        if (type) {
            filter.type = type;
        }

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const capsules = await Capsule.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Capsule.countDocuments(filter);

        res.status(200).json({
            message: "Capsules Fetched Successfully",
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: capsules
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getCapsuleById = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Capsule ID"
            });
        }

        const capsule = await Capsule.findById(req.params.id);

        if (!capsule) {
            return res.status(404).json({
                message: "Capsule Not Found"
            });
        }

        res.status(200).json({
            message: "Capsule Fetched Successfully",
            data: capsule
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.updateCapsule = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Capsule ID"
            });
        }

        const capsule = await Capsule.findById(req.params.id);

        if (!capsule) {
            return res.status(404).json({
                message: "Capsule Not Found"
            });
        }

        const updatedCapsule = await Capsule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Capsule Updated Successfully",
            data: updatedCapsule
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.deleteCapsule = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Capsule ID"
            });
        }

        const capsule = await Capsule.findById(req.params.id);

        if (!capsule) {
            return res.status(404).json({
                message: "Capsule Not Found"
            });
        }

        await Capsule.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Capsule Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};