import express from 'express';

import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../controller/projectController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

import {
    createProjectValidator,
    updateProjectValidator
} from '../validators/projectValidator.js';

import { validate } from '../middleware/validate.js';

const router = express.Router();


router.post(
    '/',
    authMiddleware,
    createProjectValidator,
    validate,
    createProject
);


router.get(
    '/',
    authMiddleware,
    getProjects
);


router.get(
    '/:id',
    authMiddleware,
    getProjectById
);


router.put(
    '/:id',
    authMiddleware,
    updateProjectValidator,
    validate,
    updateProject
);


router.delete(
    '/:id',
    authMiddleware,
    deleteProject
);


export default router;