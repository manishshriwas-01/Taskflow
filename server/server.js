import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 3000;

const tasks = [
    {
        id: 1,
        title: 'Learn Express',
        description: 'Learn Express.js basics',
        status: 'Todo',
        priority: 'High',
        dueDate: '2026-08-15'
    },
    {
        id: 2,
        title: 'Build Task API',
        description: 'Create CRUD APIs for TaskFlow',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: '2026-08-16'
    }
];
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'TaskFlow server is running'
    })
});

app.get('/api/tasks', (req, res) => {
    res.status(200).send(tasks);
})

app.post('/api/tasks', (req, res) => {

    const {
        title,
        description,
        status,
        priority,
        dueDate
    } = req.body;


    if (!title || !status || !priority || !dueDate) {

        return res.status(400).json({
            message: 'Title, status, priority and dueDate are required'
        });

    }


    const newId =
        tasks.length > 0
            ? Math.max(...tasks.map(task => task.id)) + 1
            : 1;


    const newTask = {
        id: newId,
        title,
        description: description || '',
        status,
        priority,
        dueDate
    };


    tasks.push(newTask);


    res.status(201).json(newTask);

});

app.get('/api/tasks/:id', (req, res) => {

  const id = Number(req.params.id);

  const task = tasks.find(
    task => task.id === id
  );

  if (!task) {

    return res.status(404).json({
      message: 'Task not found'
    });

  }

  res.status(200).json(task);

});

app.put('/api/tasks/:id', (req, res) => {

    const id = Number(req.params.id);


    if (Number.isNaN(id)) {

        return res.status(400).json({
            message: 'Invalid task ID'
        });

     }


    const taskIndex = tasks.findIndex(
        task => task.id === id
    );


    if (taskIndex === -1) {

        return res.status(404).json({
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
            message: 'Title, status, priority and dueDate are required'
        });

    }


    tasks[taskIndex] = {
        id,
        title,
        description: description || '',
        status,
        priority,
        dueDate
    };


    res.status(200).json(tasks[taskIndex]);

});

app.delete('/api/tasks/:id', (req, res) => {

    const id = Number(req.params.id);


    if (Number.isNaN(id)) {

        return res.status(400).json({
            message: 'Invalid task ID'
        });

    }


    const taskIndex = tasks.findIndex(
        task => task.id === id
    );


    if (taskIndex === -1) {

        return res.status(404).json({
            message: 'Task not found'
        });

    }


    tasks.splice(taskIndex, 1);


    res.status(204).send();

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
