const express = require('express');
const mongoose = require('mongoose');
const allRoutes = require('./route/allRoute');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.use('/', allRoutes)
        app.listen(3006, () => {
            console.log('Server is running on port 3006');
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));