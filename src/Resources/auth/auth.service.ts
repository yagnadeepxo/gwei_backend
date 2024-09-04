
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { Business } from '../../models/Business';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
const usersCollection = db.collection('users');
const businessCollection = db.collection('businesses');

export class AuthService {
  async registerUser(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({ ...userData, password: hashedPassword });

    const userDocument = { ...user, _id: new ObjectId() };
    const result = await usersCollection.insertOne(userDocument);

    return result.insertedId;
  }

  async loginUser(email: string, password: string) {
    const user = await usersCollection.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );
    return { token, userId: user._id };
  }

    // Method to register a new business
    async registerBusiness(businessData: any) {
      const hashedPassword = await bcrypt.hash(businessData.password, 10);
  
      const business = new Business({ ...businessData, password: hashedPassword });
  
      const businessDocument = { ...business, _id: new ObjectId(), createdAt: new Date(), updatedAt: new Date() };
      const result = await businessCollection.insertOne(businessDocument);
  
      return result.insertedId;
    }

    async loginBusiness(email: string, password: string) {
      const business = await businessCollection.findOne({ email });
  
      if (!business) {
        throw new Error('Business not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, business.password);
  
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
  
      const token = jwt.sign(
        { businessId: business._id, name: business.name, email: business.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );
      
      return { token, businessId: business._id };
    }
  
}

export const extractUserFromToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
      return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { 
          userId: string; 
          username: string; 
          email: string;
      };
      
      (req as any).user = {
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email
      };
      
      next();
  } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
  }
};