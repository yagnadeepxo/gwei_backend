// src/routes/auth.router.ts
import { Router } from 'express';
import { AuthController } from './auth.controller';

const AuthRouter = Router();
const authController = new AuthController();

// POST /api/users/register - Route to register a new user
AuthRouter.post('/api/users/register', (req, res) => authController.registerUser(req, res));
AuthRouter.post('/api/users/login', (req, res) => authController.loginUser(req, res));


export default AuthRouter;
