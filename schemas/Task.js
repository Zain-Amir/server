// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);