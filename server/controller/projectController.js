// import projects from '../data/projects.js';
import Project from "../models/Project.js";



export const createProject= async(req,res,next)=>{
    try{
        const{
            name,
            description
        }=req.body;
        const project=await Project.create({
            name,
            description,
            userId:req.user.id
        });
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    }catch(error){
        next(error);
    }
}

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





export const updateProject = async (req, res, next) => {

    try {

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

        // Find project belonging to logged-in user
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

        // Update project
        project.name = trimmedName;

        project.description = description
            ? description.trim()
            : '';

        // Save changes to MongoDB
        await project.save();

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        next(error);
    }
};

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