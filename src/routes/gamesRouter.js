import { Router } from 'express';
import { postGames } from '../controllers/gamesControllers.js';
import { postGamesValidation } from '../middlewares/gamesMiddlewares.js'; 

const gamesRouter = Router();
gamesRouter.post("/games", postGamesValidation, postGames);
export default gamesRouter;