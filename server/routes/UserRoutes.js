import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'
import taskController from '../controller/taskController.js'
import isAuthenticated from '../middleware/auth.js'

// Public Routes
router.post('/register', userController.register)
router.post('/login', userController.login);

// Private Routes
router.get('/', userController.home)
router.post('/user/task/create', isAuthenticated, taskController.newTask)
router.get('user/tasks/:id', isAuthenticated, taskController.viewTask)



export default router;