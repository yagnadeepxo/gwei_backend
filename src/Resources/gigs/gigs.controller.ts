import { Request, Response } from 'express';
import { GigService } from "./gigs.service";

const gigService = new GigService();

export class GigController {
  async createGig(req: Request, res: Response) {
    try {
        const gigData = req.body;
        const gigId = await gigService.createGig(gigData);
        res.status(201).json({ message: 'Gig created successfully', gigId });
      } catch (error: any) {
        res.status(500).json({ message: 'Error creating gig', error: error.message });
      }
  }

  async getGigs(req: Request, res: Response) {
    try {
      const gigs = await gigService.getGigs();
      res.status(200).json(gigs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching gigs', error });
    }
  }

  async getGigById(req: Request, res: Response) {
    try {
      const gig = await gigService.getGigById(req.params.id);
      res.json(gig);
    } catch (error) {
      console.error(error); // Log the error message
      if (error.message === 'Gig not found') {
        res.status(404).json({ error: 'Gig not found' });
      } else {
        res.status(500).json({ error: 'Error fetching gig' });
      }
    }
  }

  
}
