import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import gamesRouter from "./gamesRouter.js";

const router = Router();
router.use(categoriesRouter);
router.use(gamesRouter);

export default router;
