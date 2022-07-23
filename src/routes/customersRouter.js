import { Router } from 'express';
import { postCustomers } from '../controllers/customersControllers.js';
import { customersValidation } from '../middlewares/customersMiddlewares.js'; 
import { putCustomers } from '../controllers/customersControllers.js';

const customersRouter = Router();
customersRouter.post("/customers", customersValidation, postCustomers);
customersRouter.put("/customers/:id", customersValidation, putCustomers);
export default customersRouter;