import request from 'supertest';
import mongoose from 'mongoose';

import app from '../server.js';
import { connectDB } from '../config/db.js';


beforeAll(async () => {

    // Connect to MongoDB before tests
    await connectDB();

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

            // Create unique email for test user
            const uniqueEmail =
                `test${Date.now()}@example.com`;


            // Send registration request
            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: 'Test User',

                        email: uniqueEmail,

                        password: 'Test@12345'

                    });


            // Check successful registration
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


            // First registration
            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Test User',

                    email: email,

                    password: 'Test@12345'

                });


            // Try registering same email again
            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: 'Another User',

                        email: email,

                        password: 'Test@12345'

                    });


            // Duplicate email should return 409
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

            // Send invalid registration data
            const response =
                await request(app)
                    .post('/api/auth/register')
                    .send({

                        name: '',

                        email: 'invalid-email',

                        password: ''

                    });


            // Validation should return 400
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


            // Create user before login
            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Login Test User',

                    email: email,

                    password: password

                });


            // Login with correct credentials
            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email: email,

                        password: password

                    });


            // Check successful login
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


            // Create user
            await request(app)
                .post('/api/auth/register')
                .send({

                    name: 'Wrong Password User',

                    email: email,

                    password: correctPassword

                });


            // Login using wrong password
            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email: email,

                        password: 'WrongPassword@123'

                    });


            // Wrong password should return 401
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

            // Login with email not present in database
            const response =
                await request(app)
                    .post('/api/auth/login')
                    .send({

                        email:
                            `notfound${Date.now()}@example.com`,

                        password:
                            'Test@12345'

                    });


            // Unknown email should return 401
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