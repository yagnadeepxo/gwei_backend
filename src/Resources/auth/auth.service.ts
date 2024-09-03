
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
const usersCollection = db.collection('users');

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
          email: string; // Make sure email is included in the type
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