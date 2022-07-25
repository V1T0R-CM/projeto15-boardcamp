import { Router } from 'express';
import { postEndRental, postRentals } from '../controllers/rentalsControllers.js';
import { postRentalsValidation, postEndRentalValidation } from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.post("/rentals", postRentalsValidation, postRentals);
rentalsRouter.post("/rentals/:id/return", postEndRentalValidation,postEndRental);
export default rentalsRouter;