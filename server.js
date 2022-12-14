const express = require('express');
const connectDb = require('./config/db');
const apiRoutes = require("./routes/apiRoutes");
var cors = require('cors')


const app = express()
require('dotenv').config()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

// mongodb connection
connectDb();

app.get('/', (req, res) => {
    res.json({ message: "Api connection has been established" })
})

app.use('/api', apiRoutes);

//console error 
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        console.error(error);
    }

    next(error);
})

// custom error handler
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    }

    else {
        res.status(500).json({
            message: error.message
        })
    }

})

app.listen(port, () => {
    console.log(`Your app listening on port ${port}`)
})