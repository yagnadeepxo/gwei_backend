// src/services/businessService.ts

import { Business } from '../../models/Business';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
const db = client.db();

const businessesCollection = db.collection('businesses');

export class BusinessService {
  async getBusinessByName(name: string): Promise<Business | null> {
    const business = await businessesCollection.findOne({ name });
    if (!business) return null;
    return {
      name: business.name
    } as Business;
  }
}
