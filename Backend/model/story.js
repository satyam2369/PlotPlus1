const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    authorId: {
        type: String,
        trim: true,
    },
    categories
    : {
        type: [String],  // Array of category strings
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    coverImage: {
        type: String,
    },
});

module.exports = mongoose.model('Story', storySchema);
