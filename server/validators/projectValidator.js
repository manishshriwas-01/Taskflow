import { body } from 'express-validator';

export const createProjectValidator = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3 })
        .withMessage('Project name must be at least 3 characters'),

    body('description')
        .optional()
        .isString()
        .withMessage('Project description must be a string')
        .trim()

];


export const updateProjectValidator = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3 })
        .withMessage('Project name must be at least 3 characters'),

    body('description')
        .optional()
        .isString()
        .withMessage('Project description must be a string')
        .trim()

];