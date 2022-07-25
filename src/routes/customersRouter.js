import { Router } from 'express';
import { getCustomers, putCustomers, postCustomers } from '../controllers/customersControllers.js';
import { customersValidation } from '../middlewares/customersMiddlewares.js'; 

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id",getCustomers);
customersRouter.post("/customers", customersValidation, postCustomers);
customersRouter.put("/customers/:id", customersValidation, putCustomers);
export default customersRouter;