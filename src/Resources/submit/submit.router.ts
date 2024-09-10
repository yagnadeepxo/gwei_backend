import { Router } from "express";
import { SubmissionController } from "./submit.controller";
import { extractUserFromToken } from "../auth/auth.service";

const submissionRouter = Router();
const submissionController = new SubmissionController();

submissionRouter.post('/api/:gigId/submissions', extractUserFromToken, (req, res) => submissionController.createSubmission(req, res));
submissionRouter.get('/api/submissions', submissionController.getSubmissions);
submissionRouter.get('/api/submissions/:gigId', submissionController.getSubmissionById);


export default submissionRouter;
