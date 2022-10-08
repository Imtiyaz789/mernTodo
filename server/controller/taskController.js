import mongoose from "mongoose";
import Task from "../model/Task.js";
import User from "../model/User.js";

const newTask = async (req, res) => {

    const { taskName, assigndTo, description, priority, dueDate, status } = req.body;
    //  First way to save task
    const userId = req.user;
    console.log('user id', userId)

    let taskObj = {
        taskName: taskName,
        assigndTo: assigndTo,
        description: description,
        priority: priority,
        dueDate: dueDate,
        user: userId
    }
    let newTasks = new Task({ taskObj });

    newTasks.save((err, doc) => {
        if (err) {
            res.status(400).send(err)
        }
        res.status(200).json({
            message: 'success',
            doc: doc,
        })
    })

    //  Second way to save task
    // let unique;
    // await User.findOne({ email: req.body.email }, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     unique = user.id;
    //     console.log('unique', unique)
    //     Task.create({
    //         taskName: taskName,
    //         assigndTo: assigndTo,
    //         description: description,
    //         priority: priority,
    //         dueDate: dueDate
    //     }, function (err, newTask) {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }

    //         newTask.user.id = unique;
    //         newTask.save();

    //         console.log(newTask);

    //         user.tasks.push(newTask);
    //         user.save();

    //         return res.status(200).json({
    //             message: 'Task Created',
    //             user: user,
    //         })
    //     })
    // })

    // third way to save task
    // let userId = req.user.token;
    // console.log('user id', userId)
    // Task.create({
    //     taskName: taskName,
    //     assigndTo: assigndTo,
    //     description: description,
    //     priority: priority,
    //     dueDate: dueDate,
    //     status: status,
    //     user: req.user
    // },
    //     (err, task) => {
    //         if (err) {
    //             console.log(err);
    //             res.send(401).json({
    //                 message: "Not Authorised User"
    //             })
    //             return;
    //         }
    //         // task.save();
    //         res.send(200).json({
    //             message: 'Task Created',
    //             tasks: task
    //         })
    //     })
}
const viewTask = async (req, res) => {

}
export default {
    newTask,
    viewTask
}