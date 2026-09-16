import Project from "../models/Project.js";


// =========================================
// CREATE PROJECT
// POST /api/projects
// =========================================

export const createProject = async (req, res, next) => {

    try {

        const {
            name,
            description
        } = req.body;


        const project = await Project.create({

            name,

            description,

            userId: req.user.id

        });


        res.status(201).json({

            success: true,

            message: 'Project created successfully',

            data: project

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// GET ALL PROJECTS
// GET /api/projects
// =========================================

export const getProjects = async (req, res, next) => {

    try {

        const projects = await Project.find({

            userId: req.user.id

        });


        res.status(200).json({

            success: true,

            data: projects

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// GET PROJECT BY ID
// GET /api/projects/:id
// =========================================

export const getProjectById = async (req, res, next) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user.id

        });


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

    } catch (error) {

        next(error);

    }

};



// =========================================
// UPDATE PROJECT
// PUT /api/projects/:id
// =========================================

export const updateProject = async (req, res, next) => {

    try {

        const {
            name,
            description
        } = req.body;


        // =====================================
        // FIND PROJECT
        // =====================================

        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user.id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: 'Project not found'

            });

        }


        // =====================================
        // UPDATE PROJECT
        // =====================================

        project.name = name.trim();

        project.description = description
            ? description.trim()
            : '';


        await project.save();


        res.status(200).json({

            success: true,

            data: project

        });

    } catch (error) {

        next(error);

    }

};



// =========================================
// DELETE PROJECT
// DELETE /api/projects/:id
// =========================================

export const deleteProject = async (req, res, next) => {

    try {

        const project = await Project.findOne({

            _id: req.params.id,

            userId: req.user.id

        });


        if (!project) {

            return res.status(404).json({

                success: false,

                message: 'Project not found'

            });

        }


        await project.deleteOne();


        res.status(204).send();

    } catch (error) {

        next(error);

    }

};