import Task from "../models/Task.js";


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


        console.log(
            'Loading tasks for project:',
            projectId
        );


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


        console.log(
            'Project tasks found:',
            tasks.length
        );


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
        // TITLE VALIDATION
        // =====================================

        if (!title) {

            return res.status(400).json({

                success: false,

                message: 'Task title is required'

            });

        }


        if (typeof title !== 'string') {

            return res.status(400).json({

                success: false,

                message: 'Task title must be a string'

            });

        }


        const trimmedTitle =
            title.trim();


        if (trimmedTitle.length < 3) {

            return res.status(400).json({

                success: false,

                message:
                    'Task title must be at least 3 characters'

            });

        }


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
        // UPDATE
        // =====================================

        task.title =
            trimmedTitle;


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


        if (projectId !== undefined) {

            task.projectId = projectId;

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