// profile.service.ts

import { MongoClient, ObjectId } from 'mongodb';
import { Profile } from '../../models/profile';
import 'dotenv/config'

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const db = client.db();
const profileCollection = db.collection<Profile>('profiles');

class ProfileService {
  async createProfile(profileData: Omit<Profile, '_id'>, username: string): Promise<string> {
    try {
      const profile: Profile = {
        _id: new ObjectId().toString(),
        username: username,
        About: profileData.About,
        skills: profileData.skills,
        twitter: profileData.twitter,
        github: profileData.github,
        linkedIn: profileData.linkedIn
      };
      const result = await profileCollection.insertOne(profile);
      return result.insertedId.toString();
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  async getProfileByUsername(username: string): Promise<Profile | null> {
    try {
      const result = await profileCollection.findOne({ username: username });
      return result ? { ...result, _id: result._id.toString() } : null;
    } catch (error) {
      console.error('Error getting profile by username:', error);
      throw error;
    }
  }

  async updateProfileByUsername(username: string, profile: Partial<Profile>): Promise<Profile | null> {
    try {
      await profileCollection.updateOne(
        { username: username },
        { $set: profile }
      );
      const updatedProfile = await profileCollection.findOne({ username: username });
      return updatedProfile ? { ...updatedProfile} : null;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();