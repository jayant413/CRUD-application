const express = require("express");
const DetailsRoute = require("./detailsRoute")

const router = express.Router();



router.use('/details', DetailsRoute);



module.exports = router;