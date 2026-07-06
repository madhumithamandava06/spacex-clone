const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema(
    {
        capsuleName: {
            type: String,
            required: true,
            trim: true
        },
        serialNumber: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            trim: true
        },
        lastMission: {
            type: String,
            required: true,
            trim: true
        },
        crewCapacity: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Capsule", capsuleSchema);