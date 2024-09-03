import { Router } from 'express';
import { GigController } from './gigs.controller';

const gigRouter = Router();
const gigController = new GigController();

gigRouter.post('/api/gigs', gigController.createGig);
gigRouter.get('/api/gigs', (req, res) => gigController.getGigs(req, res));
gigRouter.get('/api/gigs/:id', (req, res) => gigController.getGigById(req, res));

export default gigRouter;