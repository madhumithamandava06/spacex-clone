const mongoose = require('mongoose');

const rocketSchema = new mongoose.Schema(
    {
        rocketName: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        height: {
            type: Number,
            required: true
        },
        diameter: {
            type: Number,
            required: true
        },
        mass: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        firstFlight: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        rocketImage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Rocket', rocketSchema);