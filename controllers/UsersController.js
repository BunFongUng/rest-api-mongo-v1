import bcryptjs from 'bcryptjs';
import Users from '../models/User';
import { validateEmail } from '../helpers';

export const fetchUsers = async (req, res) => {
    try {
        if (req.user) {
            const user = req.user;
            res.json({
                status: 'success',
                user
            });
        } else {
            if (res.statusCode === 404) {
                return res.json({
                    status: 'error',
                    error: 'User not found'
                });
            }

            if (res.statusCode === 401) {
                return res.json({
                    status: 'error',
                    error: 'Invalid email or password'
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}


export const fetchUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        res.json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: 'Internal error'
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailAddress,
            password
        } = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);

        if (!validateEmail(emailAddress)) {
            return res.status(400).json({
                status: 'error',
                error: 'Invalid email'
            });
        }

        const user = await Users.create({
            firstName,
            lastName,
            emailAddress,
            password: hashPassword
        });

        res.setHeader('Location', '/');

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}