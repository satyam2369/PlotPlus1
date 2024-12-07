const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const charSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    authorId : {
        type: String,
    },
    description: {
        type: String,
    },
    genre: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    charImage: {
        type: String,
    },
});

module.exports = mongoose.model('Character', charSchema);
