const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema(
    {
        missionName: {
            type: String,
            required: true,
            trim: true
        },
        rocket: {
            type: String,
            required: true,
            trim: true
        },
        launchDate: {
            type: Date,
            required: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        missionImage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Mission', missionSchema);