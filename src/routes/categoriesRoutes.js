import { Router } from 'express';
import { postCategories } from '../controllers/categoriesController.js';
import { postCategoriesValidation } from '../middlewares/categoriesMiddlewares.js';

const categoriesRouter = Router();
categoriesRouter.post("/categories", postCategoriesValidation, postCategories);
export default categoriesRouter;