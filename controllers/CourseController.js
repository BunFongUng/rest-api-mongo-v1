import Course from '../models/Course';

export const fetchCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('user', 'firstName', 'lastName');
        res.json({
            status: 'success',
            courses
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const course = await Course.findById(id).populate('user');

        res.json({
            status: 'success',
            course
        });
    } catch (error) {
        res.json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
};

export const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            user
        } = req.body;
        const course = await Course.create({
            title,
            description,
            user
        });

        res.setHeader('Location', `/courses/${course._id}`);
        res.status(204).send();
    } catch (error) {
        res.json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}

export const updatedCourse = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const body = req.body;
        const loggedInUser = req.user[0];

        const course = await Course.findById(id);

        if (!course.user.equals(loggedInUser._id)) {
            return res.status(403).json({
                status: 'error',
                error: 'can not updated course of other user'
            });
        }

        const updatedcourse = await Course.findByIdAndUpdate(id, {
            $set: {
                ...body
            }
        });

        res.status(204).send();
    } catch (error) {
        res.json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const loggedInUser = req.user[0];

        const course = await Course.findById(id);

        if (!course.user.equals(loggedInUser._id)) {
            return res.status(403).json({
                status: 'error',
                error: 'can not updated course of other user'
            });
        }

        const deletedCourse = await Course.findByIdAndRemove(id);

        res.status(204).send();
    } catch (error) {
        res.json({
            status: 'error',
            error,
            message: 'Internal error'
        });
    }
}