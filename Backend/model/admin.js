const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model("Admin", AdminSchema);