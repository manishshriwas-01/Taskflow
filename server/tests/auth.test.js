import request from 'supertest';
import mongoose from 'mongoose';

import app from '../server.js';
import { connectDB } from '../config/db.js';


beforeAll(async () => {

    // Use separate test database
    process.env.MONGODB_URI =
        process.env.MONGODB_TEST_URI;

    // Connect to test database
    await connectDB();

    // Clear test database before running tests
    await mongoose.connection.dropDatabase();

});


afterAll(async () => {

    // Close MongoDB connection after tests
    await mongoose.connection.close();

});


describe('Auth API', () => {


    // =========================================
    // REGISTER - SUCCESS
    // =========================================

    test(
        'POST /api/auth/register - should register a new user',
        async () => {

            const uniqueEmail =
                `test${Date.now()}@example.com`;

            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: 'Test User',

                        email: uniqueEmail,

                        password: 'Test@12345'

                    });

            expect(response.statusCode)
                .toBe(201);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.message)
                .toBe(
                    'User registered successfully'
                );

            expect(response.body.data)
                .toHaveProperty('id');

            expect(response.body.data.email)
                .toBe(uniqueEmail);

        }
    );


    // =========================================
    // REGISTER - DUPLICATE EMAIL
    // =========================================

    test(
        'POST /api/auth/register - should reject duplicate email',
        async () => {

            const email =
                `duplicate${Date.now()}@example.com`;

            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Test User',

                    email: email,

                    password: 'Test@12345'

                });

            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: 'Another User',

                        email: email,

                        password: 'Test@12345'

                    });

            expect(response.statusCode)
                .toBe(409);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe('Email already registered');

        }
    );


    // =========================================
    // REGISTER - INVALID DATA
    // =========================================

    test(
        'POST /api/auth/register - should reject invalid data',
        async () => {

            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: '',

                        email: 'invalid-email',

                        password: ''

                    });

            expect(response.statusCode)
                .toBe(400);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.errors)
                .toBeDefined();

        }
    );


    // =========================================
    // LOGIN - SUCCESS
    // =========================================

    test(
        'POST /api/auth/login - should login successfully',
        async () => {

            const email =
                `login${Date.now()}@example.com`;

            const password = 'Test@12345';

            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Login Test User',

                    email: email,

                    password: password

                });

            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email: email,

                        password: password

                    });

            expect(response.statusCode)
                .toBe(200);

            expect(response.body.success)
                .toBe(true);

            expect(response.body.message)
                .toBe('Login Successful');

            expect(response.body.data)
                .toHaveProperty('token');

            expect(response.body.data.user)
                .toHaveProperty('id');

            expect(response.body.data.user.email)
                .toBe(email);

        }
    );


    // =========================================
    // LOGIN - WRONG PASSWORD
    // =========================================

    test(
        'POST /api/auth/login - should reject wrong password',
        async () => {

            const email =
                `wrongpass${Date.now()}@example.com`;

            const correctPassword = 'Test@12345';

            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Wrong Password User',

                    email: email,

                    password: correctPassword

                });

            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email: email,

                        password: 'WrongPassword@123'

                    });

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    'Invalid email or password'
                );

        }
    );


    // =========================================
    // LOGIN - USER NOT FOUND
    // =========================================

    test(
        'POST /api/auth/login - should reject non-existing email',
        async () => {

            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email:
                            `notfound${Date.now()}@example.com`,

                        password:
                            'Test@12345'

                    });

            expect(response.statusCode)
                .toBe(401);

            expect(response.body.success)
                .toBe(false);

            expect(response.body.message)
                .toBe(
                    'Invalid email or password'
                );

        }
    );

});