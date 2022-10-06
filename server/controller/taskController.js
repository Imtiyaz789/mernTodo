import mongoose from "mongoose";
import Task from "../model/Task";


const newTask = async (req, res) => {
    const { taskName, assigndTo, description, priority, dueDate, status } = req.body;
    const userId = req.params;
    if (taskName && assigndTo && description && priority && dueDate) {
        const taskData = new Task({
            taskName: taskName,
            assigndTo: assigndTo,
            description: description,
            priority: priority,
            dueDate: dueDate,
            user: userId.id
        })
    } else {
        return res.status(403).json({
            status: "Failed",
            message: 'All fields are required'
        })
    }
}

export default {
    newTask
}