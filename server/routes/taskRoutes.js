import express from 'express';


import { getTaskById,getTasks,createTask ,updateTask,deleteTask} from '../controller/taskController.js';
import { createTaskValidator,updateTaskValidator } from '../validators/taskValidator.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTaskById);
router.post('/', createTaskValidator,validate,createTask);
router.put('/:id',updateTaskValidator,validate,updateTask);
router.delete('/:id',deleteTask)


export default router;