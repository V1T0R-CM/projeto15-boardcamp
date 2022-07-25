import { Router } from 'express';
import { postRentals } from '../controllers/rentalsControllers.js';
import { postRentalsValidation } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.post("/rentals", postRentalsValidation, postRentals);
export default rentalsRouter;