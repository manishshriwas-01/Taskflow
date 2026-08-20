import express from 'express';
import { getProjects,getProjectById,createProject,updateProject,deleteProject } from '../controller/projectController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;