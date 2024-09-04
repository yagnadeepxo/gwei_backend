import { Request, Response } from 'express';
import { GigService } from "./gigs.service";
import { ObjectId } from 'mongodb';

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
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid gig ID' });
      }
      const gig = await gigService.getGigById(id);
      res.json(gig);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Gig not found') {
        res.status(404).json({ error: 'Gig not found' });
      } else {
        res.status(500).json({ error: 'Error fetching gig', details: error.message });
      }
    }
  }

  async getGigsByCompany(req: Request, res: Response) {
    try {
      const company = req.params.company;
      const gigs = await gigService.getGigsByCompany(company);
      res.status(200).json(gigs);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'No gigs found for this company') {
        res.status(404).json({ error: 'No gigs found for this company' });
      } else {
        res.status(500).json({ error: 'Error fetching gigs for company', details: error.message });
      }
    }
  }
}
