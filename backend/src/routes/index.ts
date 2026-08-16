import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import { seedAdminUser } from '../seeds/seedUsers.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

const router = Router();

router.post('/seed', async (_req: Request, res: Response) => {
  try {
    const result = await seedAdminUser();
    sendSuccess({
      res,
      statusCode: 200,
      message: result.message,
      data: result.user,
    });
  } catch (error: any) {
    sendError({
      res,
      statusCode: 500,
      message: error.message || 'Failed to seed admin user',
    });
  }
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
