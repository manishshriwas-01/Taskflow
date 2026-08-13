import projects from '../data/projects.js';

export const getProjects = (req, res) => {

    res.status(200).json({
        success: true,
        data: projects
    });

};

export const getProjectById = (req, res) => {

    const id = Number(req.params.id);

    const project = projects.find(
        project => project.id === id
    );

    if (!project) {

        return res.status(404).json({
            success: false,
            message: 'Project not found'
        });

    }

    res.status(200).json({
        success: true,
        data: project
    });

};


export const createProject = (req, res) => {

    const {
        name,
        description
    } = req.body;


    // Name required
    if (!name) {

        return res.status(400).json({
            success: false,
            message: 'Project name is required'
        });

    }


    // Name must be a string
    if (typeof name !== 'string') {

        return res.status(400).json({
            success: false,
            message: 'Project name must be a string'
        });

    }


    // Remove extra spaces
    const trimmedName = name.trim();


    // Minimum 3 characters
    if (trimmedName.length < 3) {

        return res.status(400).json({
            success: false,
            message: 'Project name must be at least 3 characters'
        });

    }


    // Description must be a string if provided
    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {

        return res.status(400).json({
            success: false,
            message: 'Project description must be a string'
        });

    }


    const newId =
        projects.length > 0
            ? Math.max(
                ...projects.map(project => project.id)
              ) + 1
            : 1;


    const newProject = {

        id: newId,

        name: trimmedName,

        description: description
            ? description.trim()
            : ''

    };


    projects.push(newProject);


    res.status(201).json({

        success: true,

        data: newProject

    });

};



export const updateProject = (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: 'Invalid project ID'
        });

    }


    const projectIndex = projects.findIndex(
        project => project.id === id
    );


    if (projectIndex === -1) {

        return res.status(404).json({
            success: false,
            message: 'Project not found'
        });

    }


    const {
        name,
        description
    } = req.body;


    // Name required

    if (!name) {

        return res.status(400).json({
            success: false,
            message: 'Project name is required'
        });

    }


    // Name must be string

    if (typeof name !== 'string') {

        return res.status(400).json({
            success: false,
            message: 'Project name must be a string'
        });

    }


    const trimmedName = name.trim();


    // Minimum length

    if (trimmedName.length < 3) {

        return res.status(400).json({
            success: false,
            message: 'Project name must be at least 3 characters'
        });

    }


    // Description validation

    if (
        description !== undefined &&
        typeof description !== 'string'
    ) {

        return res.status(400).json({
            success: false,
            message: 'Project description must be a string'
        });

    }


    projects[projectIndex] = {

        id,

        name: trimmedName,

        description: description
            ? description.trim()
            : ''

    };


    res.status(200).json({

        success: true,

        data: projects[projectIndex]

    });

};


export const deleteProject = (req, res) => {

    const id = Number(req.params.id);

    // Validate ID
    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: 'Invalid project ID'
        });

    }


    // Find project
    const projectIndex = projects.findIndex(
        project => project.id === id
    );


    // Project not found
    if (projectIndex === -1) {

        return res.status(404).json({
            success: false,
            message: 'Project not found'
        });

    }


    // Delete project
    projects.splice(projectIndex, 1);


    // No response body
    res.status(204).send();

};