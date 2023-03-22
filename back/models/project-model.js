const mongoose = require('mongoose');

const Project = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
    },
    type: {
        type: String,
    },
    division: {
        type: String,
    },
    catagory: {
        type: String,
    },
    priority: {
        type: String,
    },
    dept: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    projectStatus:{
        type: String,
    },
})

module.exports = mongoose.model("project", Project);