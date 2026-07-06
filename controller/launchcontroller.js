const Launch = require('../models/Launch');
const mongoose = require('mongoose');

exports.createLaunch = async (req, res) => {

    try {

        const {
            launchName,
            rocket,
            mission,
            launchDate,
            launchSite,
            status,
            description
        } = req.body;

        if (
            !launchName ||
            !rocket ||
            !mission ||
            !launchDate ||
            !launchSite ||
            !status
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const launch = await Launch.create({
            launchName,
            rocket,
            mission,
            launchDate,
            launchSite,
            status,
            description
        });

        res.status(201).json({
            message: "Launch Added Successfully",
            data: launch
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getAllLaunches= async (req, res) => {

    try {

        const {
            search,
            launchSite,
            status,
            page = 1,
            limit = 5
        } = req.query;

        let filter = {};

        if (search) {
            filter.launchName = {
                $regex: search,
                $options: "i"
            };
        }

        if (launchSite) {
            filter.launchSite = launchSite;
        }

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const launches = await Launch.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Launch.countDocuments(filter);

        res.status(200).json({
            message: "Launches Fetched Successfully",
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: launches
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getLaunchById = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Launch ID"
            });
        }

        const launch = await Launch.findById(req.params.id);

        if (!launch) {
            return res.status(404).json({
                message: "Launch Not Found"
            });
        }

        res.status(200).json({
            message: "Launch Fetched Successfully",
            data: launch
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.updateLaunch = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Launch ID"
            });
        }

        const launch = await Launch.findById(req.params.id);

        if (!launch) {
            return res.status(404).json({
                message: "Launch Not Found"
            });
        }

        const updatedLaunch = await Launch.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Launch Updated Successfully",
            data: updatedLaunch
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.deleteLaunch = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Launch ID"
            });
        }

        const launch = await Launch.findById(req.params.id);

        if (!launch) {
            return res.status(404).json({
                message: "Launch Not Found"
            });
        }

        await Launch.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Launch Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};