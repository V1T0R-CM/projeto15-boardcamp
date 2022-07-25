import { Router } from 'express';
import { postEndRental, postRentals, deleteRental } from '../controllers/rentalsControllers.js';
import { postRentalsValidation, postEndRentalValidation, deleteRentalValidation} from '../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();
rentalsRouter.post("/rentals", postRentalsValidation, postRentals);
rentalsRouter.post("/rentals/:id/return", postEndRentalValidation,postEndRental);
rentalsRouter.delete("/rentals/:id", deleteRentalValidation,deleteRental);
export default rentalsRouter;