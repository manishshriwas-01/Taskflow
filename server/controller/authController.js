import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import users from '../data/users.js';


export const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const existingUSer = users.find(
            user => user.email === email
        );
        if (existingUSer) {
            const error = new Error("Email alredy registered");
            error.statusCode = 409;
            return next(error);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newId = users.length > 0
            ? Math.max(...users.map(user => user.id)) + 1
            : 1;

        const newUser = {
            id: newId,
            name,
            email,
            password: hashedPassword
        };
        users.push(newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",

            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })
        console.log(users)

    } catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = users.find(
            user => user.email === email
        );

        if (!user) {

            const error = new Error('Invalid email or password');

            error.statusCode = 401;

            return next(error);

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            const error = new Error('Invalid email or password');

            error.statusCode = 401;

            return next(error);

        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({

            success: true,

            message: 'Login Successful',

            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }

        });

    } catch (error) {

        next(error);

    }

};