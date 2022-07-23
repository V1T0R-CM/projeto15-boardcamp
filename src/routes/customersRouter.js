import { Router } from 'express';
import { getCustomers } from '../controllers/customersControllers.js';
import { postCustomers } from '../controllers/customersControllers.js';
import { customersValidation } from '../middlewares/customersMiddlewares.js'; 
import { putCustomers } from '../controllers/customersControllers.js';

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id",getCustomers);
customersRouter.post("/customers", customersValidation, postCustomers);
customersRouter.put("/customers/:id", customersValidation, putCustomers);
export default customersRouter;