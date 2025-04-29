import express from 'express'

import { auth } from '../middlewares/auth.js';
import { addTask, deleteTask, getAllTasks, updateStatus, updateTask, } from '../controllers/taskController.js';

const taskRouter = express.Router()


taskRouter.get('/get-all-tasks', auth , getAllTasks)
taskRouter.post('/create-task', auth , addTask)
taskRouter.put('/update-status/:id', auth , updateStatus)
taskRouter.put('/update-task/:id', auth , updateTask)
taskRouter.delete('/delete-task/:id', auth , deleteTask)



export default taskRouter;