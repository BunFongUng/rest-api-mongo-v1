import {
    Router
} from 'express';
import {
    getAuthorizationFromHeader
} from '../helpers';
import {
    fetchCourses,
    getCourse,
    createCourse,
    updatedCourse,
    deleteCourse
} from '../controllers/CourseController';

const router = Router();

router.get('/courses', fetchCourses);

router.post('/courses', getAuthorizationFromHeader, createCourse);

router.put('/courses/:id', getAuthorizationFromHeader, updatedCourse);

router.delete('/courses/:id', getAuthorizationFromHeader, deleteCourse);

router.get('/courses/:id', getCourse);

export default router;