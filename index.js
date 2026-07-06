const express = require('express');
const app = express();
require('dotenv').config();
const connectdb = require('./config/db');
const userRoutes = require('./routes/authroute');
const rocketRoutes = require('./routes/rocketroutes');
const missionRoutes = require('./routes/missionroutes');
const launchRoutes = require('./routes/launchroutes');
const capsuleRoutes = require('./routes/capsuleroutes');
const authMiddleware = require('./middleware/authmiddleware');

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectdb();

app.use('/v1', userRoutes);
app.use('/v1', rocketRoutes);
app.use('/v1', missionRoutes);
app.use('/v1', launchRoutes);
app.use('/v1', capsuleRoutes);
app.get('/', (req, res) => {
    res.status(200).send("SpaceX Clone API Running");
});

app.get('/v1/profile', authMiddleware, (req, res) => {

    res.status(200).json({
        message: "Protected Route",
        user: req.user
    });

});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});