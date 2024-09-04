import { Router } from 'express';
import { BusinessController } from './business.controller';

const businessRouter = Router();
const businessController = new BusinessController();

businessRouter.get('/api/businesses/:businessName', (req, res) => {businessController.getBusinessByName(req, res)});

export default businessRouter;