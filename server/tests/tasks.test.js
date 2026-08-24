import request from 'supertest';

import mongoose from 'mongoose';

import app from '../server.js';

import { connectDB } from '../config/db.js';


let token;

let projectId;


beforeAll(async () => {

    await connectDB();


    const email =
        `tasktest${Date.now()}@example.com`;

    const password =
        'Test@12345';


    // =========================================
    // REGISTER USER
    // =========================================

    await request(app)
        .post('/api/auth/register')
        .send({

            name: 'Task Test User',

            email: email,

            password: password

        });


    // =========================================
    // LOGIN USER
    // =========================================

    const loginResponse =
        await request(app)
            .post('/api/auth/login')
            .send({

                email: email,

                password: password

            });


    token =
        loginResponse.body.data.token;


    // =========================================
    // CREATE PROJECT
    // =========================================

    const projectResponse =
        await request(app)
            .post('/api/projects')
            .set(
                'Authorization',
                `Bearer ${token}`
            )
            .send({

                name: 'Test Project',

                description:
                    'Project created for Jest tests'

            });


    expect(projectResponse.statusCode)
        .toBe(201);


    projectId =
        projectResponse.body.data._id;

});


afterAll(async () => {

    await mongoose.connection.close();

});


describe('Task API', () => {


    // =========================================
    // GET ALL TASKS
    // =========================================

    test(
        'GET /api/tasks - should return all tasks',
        async () => {

            const response =
                await request(app)
                    .get('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(200);


            expect(response.body.success)
                .toBe(true);


            expect(response.body.data)
                .toBeInstanceOf(Array);

        }
    );


    // =========================================
    // CREATE TASK
    // =========================================

    test(
        'POST /api/tasks - should create a new task',
        async () => {

            const response =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Test Task',

                        description:
                            'Task created by Jest',

                        status: 'Todo',

                        priority: 'High',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(response.statusCode)
                .toBe(201);


            expect(response.body.success)
                .toBe(true);


            expect(response.body.message)
                .toBe(
                    'Task created successfully'
                );


            expect(response.body.data)
                .toHaveProperty('_id');


            expect(response.body.data.title)
                .toBe('Test Task');


            expect(response.body.data.status)
                .toBe('Todo');


            expect(response.body.data.priority)
                .toBe('High');


            expect(response.body.data.projectId)
                .toBeDefined();

        }
    );

    // =========================================
    // GET TASKS BY PROJECT
    // =========================================

    test(
        'GET /api/tasks/project/:projectId - should return tasks of a project',
        async () => {

            const response =
                await request(app)
                    .get(
                        `/api/tasks/project/${projectId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(200);


            expect(response.body.success)
                .toBe(true);


            expect(response.body.data)
                .toBeInstanceOf(Array);


            response.body.data.forEach(task => {

                expect(task.projectId)
                    .toBeDefined();

            });

        }
    );


    // =========================================
    // GET TASK BY ID
    // =========================================

    test(
        'GET /api/tasks/:id - should return a single task',
        async () => {

            // First create a task
            const createResponse =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Single Task Test',

                        description:
                            'Testing get task by id',

                        status: 'Todo',

                        priority: 'Medium',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(createResponse.statusCode)
                .toBe(201);


            const taskId =
                createResponse.body.data._id;


            // Get task by ID
            const response =
                await request(app)
                    .get(
                        `/api/tasks/${taskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(200);


            expect(response.body.success)
                .toBe(true);


            expect(response.body.data)
                .toHaveProperty('_id');


            expect(response.body.data._id)
                .toBe(taskId);


            expect(response.body.data.title)
                .toBe('Single Task Test');


            expect(response.body.data.projectId)
                .toBeDefined();

        }
    );

    // =========================================
    // UPDATE TASK
    // =========================================

    test(
        'PUT /api/tasks/:id - should update a task',
        async () => {

            // Create task first
            const createResponse =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Task Before Update',

                        description:
                            'Original description',

                        status: 'Todo',

                        priority: 'Low',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(createResponse.statusCode)
                .toBe(201);


            const taskId =
                createResponse.body.data._id;


            // Update task
            const response =
                await request(app)
                    .put(
                        `/api/tasks/${taskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Task After Update',

                        description:
                            'Updated description',

                        status: 'In Progress',

                        priority: 'High',

                        dueDate: '2026-10-15',

                        projectId:
                            projectId

                    });


            expect(response.statusCode)
                .toBe(200);


            expect(response.body.success)
                .toBe(true);


            expect(response.body.message)
                .toBe(
                    'Task updated successfully'
                );


            expect(response.body.data)
                .toHaveProperty('_id');


            expect(response.body.data._id)
                .toBe(taskId);


            expect(response.body.data.title)
                .toBe('Task After Update');


            expect(response.body.data.description)
                .toBe('Updated description');


            expect(response.body.data.status)
                .toBe('In Progress');


            expect(response.body.data.priority)
                .toBe('High');

        }
    );


    // =========================================
    // DELETE TASK
    // =========================================

    test(
        'DELETE /api/tasks/:id - should delete a task',
        async () => {

            // Create task first
            const createResponse =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Task To Delete',

                        description:
                            'This task will be deleted',

                        status: 'Todo',

                        priority: 'Low',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(createResponse.statusCode)
                .toBe(201);


            const taskId =
                createResponse.body.data._id;


            // Delete task
            const response =
                await request(app)
                    .delete(
                        `/api/tasks/${taskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(204);


            // Verify task no longer exists
            const getResponse =
                await request(app)
                    .get(
                        `/api/tasks/${taskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(getResponse.statusCode)
                .toBe(404);


            expect(getResponse.body.success)
                .toBe(false);


            expect(getResponse.body.message)
                .toBe('Task not found');

        }
    );

    // =========================================
    // GET TASK BY ID - NOT FOUND
    // =========================================

    test(
        'GET /api/tasks/:id - should return 404 when task does not exist',
        async () => {

            const fakeTaskId =
                new mongoose.Types.ObjectId().toString();


            const response =
                await request(app)
                    .get(
                        `/api/tasks/${fakeTaskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(404);


            expect(response.body.success)
                .toBe(false);


            expect(response.body.message)
                .toBe('Task not found');

        }
    );

    // =========================================
    // CREATE TASK - VALIDATION ERROR
    // =========================================

    test(
        'POST /api/tasks - should return 400 when title is missing',
        async () => {

            const response =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        description:
                            'Task without title',

                        status: 'Todo',

                        priority: 'High',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(response.statusCode)
                .toBe(400);


            expect(response.body.success)
                .toBe(false);

        }
    );

    // =========================================
    // UPDATE TASK - VALIDATION ERROR
    // =========================================

    test(
        'PUT /api/tasks/:id - should return 400 when title is missing',
        async () => {

            // Create a valid task first
            const createResponse =
                await request(app)
                    .post('/api/tasks')
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        title: 'Task For Update Error',

                        description:
                            'Task for validation testing',

                        status: 'Todo',

                        priority: 'Medium',

                        dueDate: '2026-09-30',

                        projectId:
                            projectId

                    });


            expect(createResponse.statusCode)
                .toBe(201);


            const taskId =
                createResponse.body.data._id;


            // Try updating without title
            const response =
                await request(app)
                    .put(
                        `/api/tasks/${taskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                    .send({

                        description:
                            'Updated description',

                        status: 'Done',

                        priority: 'High',

                        dueDate: '2026-10-15',

                        projectId:
                            projectId

                    });


            expect(response.statusCode)
                .toBe(400);


            expect(response.body.success)
                .toBe(false);

        }
    );


    // =========================================
    // DELETE TASK - NOT FOUND
    // =========================================

    test(
        'DELETE /api/tasks/:id - should return 404 when task does not exist',
        async () => {

            const fakeTaskId =
                new mongoose.Types.ObjectId().toString();


            const response =
                await request(app)
                    .delete(
                        `/api/tasks/${fakeTaskId}`
                    )
                    .set(
                        'Authorization',
                        `Bearer ${token}`
                    );


            expect(response.statusCode)
                .toBe(404);


            expect(response.body.success)
                .toBe(false);


            expect(response.body.message)
                .toBe('Task not found');

        }
    );

});