require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
// const connect = require('./lib/db');
const authRoute = require('./routes/auth')

const app = express();

app.use(cors())
app.use (express.json())

// API
// app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


// 

const MONGO = process.env.DB_URL;

mongoose
    .connect(MONGO)
    .then(()=> console.log('MongoDB connected successfully'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));




app.use((err, res, req, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })

})

const port = 8080; 
app.listen( port, () => console.log(`http://localhost:${port}`));


// connect();



