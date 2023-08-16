const express = require("express");
const { sendMail, checkMail } = require("../../controllers/mailController");





const router = express.Router();


router.post('/sendMail', sendMail);
router.post('/checkMail', checkMail);


module.exports = router;