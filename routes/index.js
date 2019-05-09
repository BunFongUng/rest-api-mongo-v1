import {Router} from 'express';
import usersRoutes from './users-routes';
import coursesRoutes from './courses-routes';

const router = Router();

// uses routes
router.use(usersRoutes);

// courses routes
router.use(coursesRoutes);

export default router;