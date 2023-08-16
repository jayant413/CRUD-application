const express = require("express");
const DetailsRoute = require("./detailsRoute")
const MailRoute = require("./MailRoute");

const router = express.Router();



router.use('/details', DetailsRoute);
router.use('/mail', MailRoute);



module.exports = router;