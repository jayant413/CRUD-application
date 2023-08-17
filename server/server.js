/**
 *  Library Imports
 */
const dotenv = require("dotenv");
const express = require("express");
const colors = require('colors');
const cors = require("cors");

/**
 *   File Imports
 */
const connectDB = require("./config/db.js");
const apiRoutes = require("./routes");


//  Configuration  
dotenv.config();
connectDB();

// declare variables
const PORT = process.env.PORT || 8000;
const app = express();


/**
 *  Middlewares
 */
app.use(express.json());
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false
}))


app.use(express.urlencoded({ extended: true }))

/**
 *   Routes
 */
app.use('/api', apiRoutes);


// Default Route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})


/**
 *   Listning on PORT
 */
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.bgCyan.white);
})

