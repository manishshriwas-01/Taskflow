import express from 'express';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'TaskFlow server is running'
    });
});

app.use('/api/projects', projectRoutes);

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});