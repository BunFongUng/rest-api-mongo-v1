import { Router } from 'express';

import { getAuthorizationFromHeader } from '../helpers';
import { fetchUsers, fetchUser, createUser } from '../controllers/UsersController';

const router = Router();

router.get('/users', getAuthorizationFromHeader, fetchUsers);

router.post('/users', createUser);

router.get('/users/:id', fetchUser);

export default router;