const mongoose = require('mongoose');
const viewSchema = mongoose.Schema({
    uid: String,
    storyid: String,
})

module.exports = mongoose.model("storyViews", viewSchema);