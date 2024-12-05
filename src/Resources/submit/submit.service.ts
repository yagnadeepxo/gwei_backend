import { Submission } from "../../models/submission";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const url = process.env.MONGODB_URI
const client = new MongoClient(url);
const db = client.db();
const submissionsCollection = db.collection('submissions');

export class SubmissionService {
    async createSubmission(submissionData: Submission) {
        try {
            const submission = {
                _id: new ObjectId(),
                gigId: submissionData.gigId,
                link: submissionData.link,
                username: submissionData.username,
                email: submissionData.email,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const result = await submissionsCollection.insertOne(submission);
            return result.insertedId;
        } catch (error) {
            console.error('Error creating submission:', error);
            throw error;
        }
    }

    async getSubmissions() {
        try {
            const submissions = await submissionsCollection.find().toArray();
            return submissions;
        } catch (error) {
            console.error('Error fetching submissions:', error);
            throw error;
        }
    }
    
        async getSubmissionsByGigId(gigId: string) {
          try {
            const submissions = await submissionsCollection.find({ gigId }).toArray();
            return submissions;
          } catch (error) {
            console.error('Error fetching submissions by gigId:', error);
            throw error;
          }
        }
    

}