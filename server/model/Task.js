import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({

    taskName: {
        type: String,
        required: true,

    },
    assigndTo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    status: {
        type: String,
        enum: ['complete', 'incomplete', 'pending'],
        default: 'pending',
    },


}, {
    timestamps: true
})

const Task = mongoose.model('tasks', taskSchema);

export default Task;