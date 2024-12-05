// profile.router.ts
import { Router } from 'express';
import { profileController } from './profile.controller';
import { extractUserFromToken } from '../auth/auth.service';

const profileRouter = Router();

profileRouter.post('/api/profile', extractUserFromToken, profileController.createProfile);
profileRouter.get('/api/:username', profileController.getProfile);
profileRouter.patch('/api/update', extractUserFromToken, profileController.updateProfile);

export default profileRouter;