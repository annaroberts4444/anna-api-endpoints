// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const musicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true,
        unique: true
    },
    releaseyear: {
        type: Number,
        required: true,
    },
});

musicSchema.index({ name: 1, artist: 1 }, { unique: true })
module.exports = mongoose.model("Music", musicSchema);