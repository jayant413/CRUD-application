const express = require("express");
const { addDetails, getAllDetails, getDetail, updateDetails, deleteDetails } = require("../../controllers/detailsController");


// router
const router = express.Router();



router.post('/addDetails', addDetails);
router.get('/getAllDetails', getAllDetails);
router.get('/getDetail/:id', getDetail);
router.put('/updateDetails/:id', updateDetails);
router.delete('/deleteDetails/:id', deleteDetails);




module.exports = router;