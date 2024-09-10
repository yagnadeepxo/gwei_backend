// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const userId = await authService.registerUser(userData);

      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Call the AuthService to handle login
      const { user_token, userId } = await authService.loginUser(email, password);

      // Return the token and user ID upon successful login
      res.status(200).json({ message: 'Login successful', user_token, userId });
    } catch (error) {
      // Return an error message if something goes wrong
      res.status(401).json({ message: 'Login failed', error: error.message });
    }
  }

  async registerBusiness(req: Request, res: Response) {
    try {
      const businessData = req.body;
      const businessId = await authService.registerBusiness(businessData);

      res.status(201).json({ message: 'Business registered successfully', businessId });
    } catch (error) {
      res.status(500).json({ message: 'Error registering business', error: error.message });
    }
  }

  // Controller method for logging in a business
  async loginBusiness(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { business_token, businessId } = await authService.loginBusiness(email, password);

      res.status(200).json({ message: 'Login successful', business_token, businessId });
    } catch (error) {
      res.status(401).json({ message: 'Login failed', error: error.message });
    }
  }
}
