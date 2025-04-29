import express from 'express'

import { auth } from "../middlewares/auth.js";
import { createProject, deleteProject, getMyProjects } from '../controllers/projectController.js';

const projectRouter = express.Router();


projectRouter.post('/create',auth, createProject)
projectRouter.get('/get-my-projects',auth, getMyProjects)
projectRouter.put('/delete-project/:id', auth , deleteProject)





export default projectRouter;