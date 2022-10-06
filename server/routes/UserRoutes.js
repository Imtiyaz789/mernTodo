import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'

// Public Routes
router.post('/register', userController.register)
router.post('/login', userController.login);

// Private Routes
router.get('/', userController.home)



export default router;