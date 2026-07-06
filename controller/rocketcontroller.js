const mongoose = require('mongoose');
const Rocket = require('../models/Rocket');

exports.createRocket = async (req, res) => {

    try {

        const {
            rocketName,
            company,
            country,
            height,
            diameter,
            mass,
            active,
            firstFlight,
            description,
            rocketImage
        } = req.body;

        if (
            !rocketName ||
            !company ||
            !country ||
            !height ||
            !diameter ||
            !mass ||
            !firstFlight ||
            !description
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const rocket = await Rocket.create({
            rocketName,
            company,
            country,
            height,
            diameter,
            mass,
            active,
            firstFlight,
            description,
            rocketImage
        });

        res.status(201).json({
            message: "Rocket Added Successfully",
            data: rocket
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.getAllRockets = async (req, res) => {
    try {

        const {
            search,
            country,
            active,
            page = 1,
            limit = 5
        } = req.query;

        let filter = {};

        // Search by rocket name
        if (search) {
            filter.rocketName = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by country
        if (country) {
            filter.country = country;
        }

        // Filter by active status
        if (active !== undefined) {
            filter.active = active === "true";
        }

        const skip = (page - 1) * limit;

        const rockets = await Rocket.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Rocket.countDocuments(filter);

        res.status(200).json({
            message: "Rockets Fetched Successfully",
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            data: rockets
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
exports.getRocketById = async (req, res) => {

    try {
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        message: "Invalid Rocket ID"
    });
}
        const rocket = await Rocket.findById(req.params.id);

        if (!rocket) {
            return res.status(404).json({
                message: "Rocket Not Found"
            });
        }

        res.status(200).json({
            message: "Rocket Fetched Successfully",
            data: rocket
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};
exports.updateRocket = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Rocket ID"
            });
        }

        const rocket = await Rocket.findById(req.params.id);

        if (!rocket) {
            return res.status(404).json({
                message: "Rocket Not Found"
            });
        }

        const updatedRocket = await Rocket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Rocket Updated Successfully",
            data: updatedRocket
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.deleteRocket = async (req, res) => {

    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Rocket ID"
            });
        }

        const rocket = await Rocket.findById(req.params.id);

        if (!rocket) {
            return res.status(404).json({
                message: "Rocket Not Found"
            });
        }

        await Rocket.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Rocket Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};