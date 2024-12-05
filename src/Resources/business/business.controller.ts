// src/controllers/businessController.ts

import { Request, Response } from 'express';
import { BusinessService } from './business.service';

const businessService = new BusinessService();

export class BusinessController {
  async getBusinessByName(req: Request, res: Response) {
    try {
      const { businessName } = req.params;
      const business = await businessService.getBusinessByName(businessName);

      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      res.status(200).json({ name: business.name });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching business', error: error.message });
    }
  }
}
