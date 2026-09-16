import Task from "../models/Task.js";
import Project from "../models/Project.js";


// =========================================
// GET ALL TASKS
// GET /api/tasks
// =========================================

export const getTasks = async (req, res, next) => {

    try {

        const tasks = await Task.find({
            userId: req.user.id
        })
        .populate(
            'projectId',
            'name description'
        )
        .sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            data: tasks

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// GET TASKS BY PROJECT
// GET /api/tasks/project/:projectId
// =========================================

export const getTasksByProject = async (
    req,
    res,
    next
) => {

    try {

        const {
            projectId
        } = req.params;


        const tasks = await Task.find({

            projectId: projectId,

            userId: req.user.id

        })
        .populate(
            'projectId',
            'name description'
        )
        .sort({
            createdAt: -1
        });


        res.status(200).json({

            success: true,

            data: tasks

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// GET TASK BY ID
// GET /api/tasks/:id
// =========================================

export const getTaskById = async (
    req,
    res,
    next
) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            userId: req.user.id

        })
        .populate(
            'projectId',
            'name description'
        );


        if (!task) {

            return res.status(404).json({

                success: false,

                message: 'Task not found'

            });

        }


        res.status(200).json({

            success: true,

            data: task

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// CREATE TASK
// POST /api/tasks
// =========================================

export const createTask = async (
    req,
    res,
    next
) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate,
            projectId
        } = req.body;


        // =====================================
        // PROJECT OWNERSHIP CHECK
        // =====================================

        const project = await Project.findOne({
            _id: projectId,
            userId: req.user.id
        });


        if (!project) {

            return res.status(403).json({

                success: false,

                message:
                    'You are not authorized to use this project'

            });

        }


        // =====================================
        // CREATE TASK
        // =====================================

        const task = await Task.create({

            title,

            description,

            status,

            priority,

            dueDate,

            projectId,

            userId: req.user.id

        });


        const populatedTask =
            await Task.findById(task._id)
                .populate(
                    'projectId',
                    'name description'
                );


        res.status(201).json({

            success: true,

            message: 'Task created successfully',

            data: populatedTask

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// UPDATE TASK
// PUT /api/tasks/:id
// =========================================

export const updateTask = async (
    req,
    res,
    next
) => {

    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate,
            projectId
        } = req.body;


        // =====================================
        // FIND TASK
        // =====================================

        const task = await Task.findOne({

            _id: req.params.id,

            userId: req.user.id

        });


        if (!task) {

            return res.status(404).json({

                success: false,

                message: 'Task not found'

            });

        }


        // =====================================
        // PROJECT OWNERSHIP CHECK
        // =====================================

        if (projectId !== undefined) {

            const project = await Project.findOne({

                _id: projectId,

                userId: req.user.id

            });


            if (!project) {

                return res.status(403).json({

                    success: false,

                    message:
                        'You are not authorized to use this project'

                });

            }


            task.projectId = projectId;

        }


        // =====================================
        // UPDATE TASK
        // =====================================

        task.title = title.trim();


        task.description =
            description
                ? description.trim()
                : '';


        if (status !== undefined) {

            task.status = status;

        }


        if (priority !== undefined) {

            task.priority = priority;

        }


        if (dueDate !== undefined) {

            task.dueDate = dueDate;

        }


        await task.save();


        const updatedTask =
            await Task.findById(task._id)
                .populate(
                    'projectId',
                    'name description'
                );


        res.status(200).json({

            success: true,

            message: 'Task updated successfully',

            data: updatedTask

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// DELETE TASK
// DELETE /api/tasks/:id
// =========================================

export const deleteTask = async (
    req,
    res,
    next
) => {

    try {

        const task = await Task.findOne({

            _id: req.params.id,

            userId: req.user.id

        });


        if (!task) {

            return res.status(404).json({

                success: false,

                message: 'Task not found'

            });

        }


        await task.deleteOne();


        res.status(204).send();

    } catch (error) {

        next(error);

    }

};