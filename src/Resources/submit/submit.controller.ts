import { Request, Response } from 'express';
import { SubmissionService } from './submit.service';
import { Submission } from '../../models/submission';

export class SubmissionController {
  private submissionService: SubmissionService;

  constructor() {
    this.submissionService = new SubmissionService();
  }

  async createSubmission(req: Request, res: Response) {
    try {
      const { link } = req.body;
      const { username, email } = (req as any).user;
      const gigId = req.params.gigId;

      const submissionData: Submission = {
        gigId,
        link,
        username,
        email
      };

      const result = await this.submissionService.createSubmission(submissionData);
      res.status(201).json({ message: 'Submission created successfully', submissionId: result });
    } catch (error) {
      console.error('Error in createSubmission controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  getSubmissions = async (req: Request, res: Response) => {
    try {
      const submissions = await this.submissionService.getSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error in getSubmissions controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
