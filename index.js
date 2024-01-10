const express = require('express');
const mongoose = require('mongoose');
const Task = require('./schemas/Task');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

console.log(PORT);
mongoose.connect('mongodb+srv://zain:123456Zain@todocluster.9flnyuc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            // console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error(error);
    });


app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

