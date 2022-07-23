import { Router } from 'express';
import { postCustomers } from '../controllers/customersControllers.js';
import { postCustomersValidation } from '../middlewares/customersMiddlewares.js'; 

const customersRouter = Router();
customersRouter.post("/customers", postCustomersValidation, postCustomers);
export default customersRouter;