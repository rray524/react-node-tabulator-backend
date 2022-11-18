const mongoose = require('mongoose');

const officeSchema = mongoose.Schema({

    fName: {
        type: String,
        // unique: true,
        required: true,
    },
    mName: {
        type: String,

    },
    lName: {
        type: String,

    },
    doj: {
        type: String,
        required: true,
    },
    departMent: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },

},
    {
        timestamps: true
    });

const Office = mongoose.model('Office', officeSchema);
// search from product 
officeSchema.index({ fName: "text", lName: "text", doj: "text", department: "text" }, { fName: "TextIndex" });
// show result from ASC & DESC
officeSchema.index({ "attrs.key": 1, "attrs.value": 1 });
module.exports = Office;