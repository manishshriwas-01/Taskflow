import tasks from '../data/tasks.js';

export const getTasks = (req, res) => {

    res.status(200).json({
        success: true,
        data: tasks
    });

};

export const getTaskById = (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: 'Invalid task ID'
        });

    }

    const task = tasks.find(
        task => task.id === id
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

};





export const createTask = (req, res) => {

    const {
        title,
        description,
        status,
        priority,
        dueDate
    } = req.body;


    if (!title || !status || !priority || !dueDate) {

        return res.status(400).json({
            success: false,
            message: 'Title, status, priority and dueDate are required'
        });

    }


    if (typeof title !== 'string') {

        return res.status(400).json({
            success: false,
            message: 'Title must be a string'
        });

    }


    if (title.trim().length < 3) {

        return res.status(400).json({
            success: false,
            message: 'Title must be at least 3 characters'
        });

    }


    const newId =
        tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1;


    const newTask = {

        id: newId,

        title: title.trim(),

        description: description
            ? description.trim()
            : '',

        status,

        priority,

        dueDate

    };


    tasks.push(newTask);


    res.status(201).json({

        success: true,

        data: newTask

    });

};



export const updateTask = (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: 'Invalid task ID'
        });

    }

    const taskIndex = tasks.findIndex(
        task => task.id === id
    );

    if (taskIndex === -1) {

        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });

    }

    const {
        title,
        description,
        status,
        priority,
        dueDate
    } = req.body;


    if (!title || !status || !priority || !dueDate) {

        return res.status(400).json({
            success: false,
            message: 'Title, status, priority and dueDate are required'
        });

    }


    if (typeof title !== 'string') {

        return res.status(400).json({
            success: false,
            message: 'Title must be a string'
        });

    }


    if (title.trim().length < 3) {

        return res.status(400).json({
            success: false,
            message: 'Title must be at least 3 characters'
        });

    }


    tasks[taskIndex] = {

        id,

        title: title.trim(),

        description: description
            ? description.trim()
            : '',

        status,

        priority,

        dueDate

    };


    res.status(200).json({

        success: true,

        data: tasks[taskIndex]

    });

};



export const deleteTask = (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: 'Invalid task ID'
        });

    }

    const taskIndex = tasks.findIndex(
        task => task.id === id
    );

    if (taskIndex === -1) {

        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });

    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();

};