import { Submission } from "../../models/submission";
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URI
const client = new MongoClient(url);
const db = client.db();
const submissionsCollection = db.collection('submissions');

export class SubmissionService {
    async createSubmission(submissionData: Submission) {
        try {
            const submission = {
                _id: new ObjectId(),
                link: submissionData.link,
                username: submissionData.username,
                email: submissionData.email,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            console.log('Submission data:', submission);  // Log the submission data before insertion
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
    /*
        async getSubmissionById(id: string) {
          try {
            const submission = await submissionsCollection.findOne({ _id: new ObjectId(id) });
            return submission;
          } catch (error) {
            console.error('Error fetching submission by ID:', error);
            throw error;
          }
        }
    */

}