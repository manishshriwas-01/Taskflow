import { body } from 'express-validator';

export const createTaskValidator = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),

    body('status')
        .notEmpty()
        .withMessage('Status is required'),

    body('priority')
        .notEmpty()
        .withMessage('Priority is required'),

    body('dueDate')
        .notEmpty()
        .withMessage('Due date is required')

];




export const updateTaskValidator = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),

    body('status')
        .notEmpty()
        .withMessage('Status is required'),

    body('priority')
        .notEmpty()
        .withMessage('Priority is required'),

    body('dueDate')
        .notEmpty()
        .withMessage('Due date is required')

];