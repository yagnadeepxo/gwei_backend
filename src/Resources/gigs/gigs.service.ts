import { Gig } from '../../models/gig';
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
const db = client.db();
const gigsCollection = db.collection('gigs');

export class GigService {
  async createGig(gigData: any) {
    const gig = new Gig(gigData);
    const gigDocument = { ...gig, _id: new ObjectId() };
    const result = await gigsCollection.insertOne(gigDocument);
    return result.insertedId;
  }

  async getGigs() {
    const gigs = await gigsCollection.find().toArray();
    return gigs;
  }

  async getGigById(id: string) {
    try {
      const gig = await gigsCollection.findOne({ _id: new ObjectId(id) });
      if (!gig) {
        throw new Error('Gig not found');
      }
      return new Gig(gig);
    } catch (error) {
      console.error(error); 
      throw error;
    }
  }
}