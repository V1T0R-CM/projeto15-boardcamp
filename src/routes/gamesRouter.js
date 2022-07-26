import { Router } from 'express';
import { getGames, postGames } from '../controllers/gamesControllers.js';
import { postGamesValidation } from '../middlewares/gamesMiddlewares.js'; 

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGamesValidation, postGames);
export default gamesRouter;