const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema(
    {
        launchName: {
            type: String,
            required: true,
            trim: true
        },
        rocket: {
            type: String,
            required: true,
            trim: true
        },
        mission: {
            type: String,
            required: true,
            trim: true
        },
        launchDate: {
            type: Date,
            required: true
        },
        launchSite: {
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
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Launch', launchSchema);