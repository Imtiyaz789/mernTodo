import mongoose from 'mongoose'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const home = function (req, res) {
    res.send('<h1>Todo App</h1>')
}

const register = async (req, res) => {

    const { name, password, pwd_confirm, email } = req.body;
    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
        res.status(403).json({
            status: "Failed",
            message: 'Email Already Exist'
        })
    } else {
        if (name && password && pwd_confirm && email) {
            if (password === pwd_confirm) {
                const salt = await bcrypt.genSalt(10);
                const hashPwd = await bcrypt.hash(password, salt)
                // user will register  by below criteria which is defined in model already
                const data = new User({
                    _id: req.user._id,
                    name: name,
                    password: hashPwd,
                    pwd_confirm: pwd_confirm,
                    email: email,
                })

                await data.save()// data will be save now
                const savedUser = await User.findOne({ email: email }) // here we are generating token for user
                const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1' })
                res.status(201).json({ 'user': 'New User Added Successfully', data: data, 'token': token })
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



}
const login = async (req, res) => {

    try {
        const { password, email } = req.body;
        if (password && email) {
            const user = await User.findOne({ email: email })
            if (user != null) {
                const pwdMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && pwdMatch) {

                    const token = jwt.sign({ token: user.token }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
                    return res.status(200).json({
                        status: "Success",
                        message: 'Login Successfully',
                        email: user.email,
                        _id: user._id,
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        status: "Failed",
                        message: 'Email or Password does not Valid.'
                    })
                }
            } else {
                return res.status(401).json({
                    status: "Failed",
                    message: 'Not Register Yet.'
                })
            }
        } else {
            return res.status(403).json({
                status: "Failed",
                message: 'All fields are required'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(40).json({
            status: "Failed",
            message: 'Unable to login'
        })
    }
}

const loggedInUser = async (req, res) => {
    console.log(req.body)
    res.send({ "email": req.user })
}
export default {
    login,
    register,
    home,
    loggedInUser
}