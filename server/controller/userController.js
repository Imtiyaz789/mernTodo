import mongoose from 'mongoose'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const home = function (req, res) {
    res.send('<h1>Todo App</h1>')
}

const register = async (req, res) => {

    const { fullName, pwd, pwd_confirm, email } = req.body;
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        res.status(403).json({
            status: "Failed",
            message: 'Email Already Exist'
        })
    } else {
        if (fullName && pwd && pwd_confirm && email) {
            if (pwd === pwd_confirm) {
                const salt = await bcrypt.genSalt(10);
                const hashPwd = await bcrypt.hash(pwd, salt)
                // user will register  by below criteria which is defined in model already
                const data = new User({
                    fullName: fullName,
                    pwd: hashPwd,
                    pwd_confirm: pwd_confirm,
                    email: email,
                })

                await data.save()
                    .then((data) => {
                        res.status(200).json({ 'user': 'New User Added Successfully', data: data })
                    })
                    .catch((err) => {
                        res.status(400).send(err);
                        console.log(err)
                    })
            } else {
                return res.status(403).json({
                    status: "Failed",
                    message: 'Password and Confirm Password should be same'
                })
            }
        } else {
            return res.status(403).json({
                status: "Failed",
                message: 'All fields are required'
            })
        }

    }

    // user will register  by below criteria which is defined in model already
    // const data = new User({
    //     fullName: req.body.fullName,
    //     pwd: req.body.pwd,
    //     email: req.body.email,
    //     phoneNo: req.body.phoneNo
    // })

    // data.save()
    //     .then((data) => {
    //         res.status(200).json({ 'user': 'New User Added Successfully', data: data })
    //     })
    //     .catch((err) => {
    //         res.status(400).send(err);
    //         console.log(err)
    //     })

}
const login = (req, res) => {
    User.findOne({
        email: req.body.email,
        pwd: req.body.pwd
    },
        (err, user) => {
            if (err) {
                console.log("error in signing in", err);
                return;
            }
            if (user) {

            }
        }

    )
}
export default {
    login,
    register,
    home
}