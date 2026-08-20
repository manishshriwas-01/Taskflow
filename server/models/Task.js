import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
              enum: ['Todo', 'In Progress', 'Done'],
            default: 'Pending'
        },

        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        },

        dueDate: {
            type: Date
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;