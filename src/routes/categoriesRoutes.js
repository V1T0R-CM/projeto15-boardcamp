import { Router } from 'express';
import { getCategories, postCategories } from '../controllers/categoriesController.js';
import { postCategoriesValidation } from '../middlewares/categoriesMiddlewares.js';

const categoriesRouter = Router();
categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", postCategoriesValidation, postCategories);
export default categoriesRouter;