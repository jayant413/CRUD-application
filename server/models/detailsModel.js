const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,

    },
    hobbies: {
        type: Array,
        required: true
    }

})

const DetailsModel = mongoose.model('Details', DetailsSchema);

module.exports = DetailsModel;