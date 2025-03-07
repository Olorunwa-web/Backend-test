require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require('./db');
// const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/auth')

const app = express();

app.use(cors())
app.use (express.json())

// API
// app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


app.use((err, res, req, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })

})


const port = process.env.PORT || 8080;
app.listen( port, () => console.log(`http://localhost:${port}`));

connect();


