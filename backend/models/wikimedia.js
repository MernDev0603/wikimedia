const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let wikimediaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    topic: {
        type: String
    },
    timestamp: {
        type: Date
    },
    bot: {
        type: Boolean
    },
    minor: {
        type: Boolean
    },
    domain: {
        type: String
    },
    viewed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Wikimedia", wikimediaSchema);