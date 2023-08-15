
const DetailsModel = require("../models/detailsModel");

/***
 *    Add user Details
 */
module.exports.addDetails = async (req, res) => {
    try {
        const { name, email, number, hobbies } = req.body;


        const PrevEmail = await DetailsModel.findOne({ email: email });
        if (PrevEmail) {
            return res.status(400).json({
                message: "Email already exists",
                result: false
            })
        }

        const PrevNumber = await DetailsModel.findOne({ number: number });
        if (PrevNumber) {
            return res.status(400).json({
                message: "Number already exists",
                result: false
            })
        }

        const info = await DetailsModel.create({
            name,
            email,
            number,
            hobbies
        })


        if (info) {

            return res.status(200).json({
                message: "Data Added successfully",
                result: true
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            result: false
        })
    }
}


/**
 *   Get all user Details 
 */

module.exports.getAllDetails = async (req, res) => {
    try {
        const info = await DetailsModel.find();
        if (info) {
            return res.status(200).json({
                message: "Data fetched successfully",
                result: true,
                data: info
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            result: false
        })
    }
}

/**
 *   Get single user Details
 */
module.exports.getDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const info = await DetailsModel.findById(id);
        if (info) {
            return res.status(200).json({
                message: "Data fetched successfully",
                result: true,
                data: info
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            result: false
        })
    }
}


/**
 *    Update Details
 */

module.exports.updateDetails = async (req, res) => {


    try {
        const { id } = req.params;
        const { name, email, number, hobbies } = req.body;

        const PrevUser = await DetailsModel.findOne({ _id: id });
        if (!PrevUser) {
            return res.status(400).json({
                error: "User doesn't exist.",
                result: false
            });
        }

        const info = await DetailsModel.findByIdAndUpdate({ "_id": id }, {
            "$set": {
                name,
                email,
                number,
                hobbies
            }
        })

        if (info) {
            return res.status(200).json({
                message: "User Updated",
                result: true,
            });
        } else {
            res.status(400).json({
                error: "User Doesn't Exist",
                result: false
            });
        }



    } catch (error) {
        res.status(400).json({
            error: error.message,
            result: false
        })
    }
}


/**
 *   Delete user Details
 */


module.exports.deleteDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await DetailsModel.findByIdAndDelete(id);

        if (deleteUser) {
            return res.status(200).json({
                message: "User Deleted",
                result: true,
            });
        }

    } catch (error) {
        res.status(400).json({
            error: error.message,
            result: false
        })
    }
}