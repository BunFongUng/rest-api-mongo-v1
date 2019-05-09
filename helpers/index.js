import auth from 'basic-auth';
import bcryptjs from 'bcryptjs';
import User from '../models/User';

export const getAuthorizationFromHeader = async (req, res, next) => {
    try {
        const userCredentials = auth(req);

        if (!userCredentials) {
            return res.json({
                status: 'error',
                error: 'Authorization in header of request is required!'
            }).status(400);
        }

        const foundUser = await User.find({
            emailAddress: userCredentials.name
        });

        if (foundUser.length > 0) {
            if (bcryptjs.compareSync(userCredentials.pass, foundUser[0].password)) {
                req.user = foundUser;
                return next();
            } else {
                res.status(401);
                return next();
            }
        } else {
            res.status(404);
            return next();
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}