import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js'
import { authMiddleware } from './middleware/authMiddleware.js';

import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'http://localhost:4200',
    'https://taskflow-1-0-bknj.onrender.com'
];

app.use(cors({
    origin: allowedOrigins
}));

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

app.use('/api/tasks',authMiddleware, taskRoutes);

app.use('/api/auth',authRoutes);

app.use(errorHandler);


export default app;
if (process.env.NODE_ENV !== 'test') {

    connectDB();

    app.listen(PORT, () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    });

}
// connectDB();
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });