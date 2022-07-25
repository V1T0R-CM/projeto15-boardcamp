import connection from "../db/database.js";
import gamesSchemas from "../schemas/gamesSchemas.js";

export async function postGamesValidation(req, res, next){
    const validation = gamesSchemas.validate(req.body);
    const urlR = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i')
    
    const { rows: category} = await connection.query(`SELECT * FROM categories WHERE id = '${req.body.categoryId}'`);
    const { rows: game} = await connection.query(`SELECT * FROM games WHERE name = '${req.body.name}'`);

    if(validation.error){
        return res.sendStatus(400)
    }

    if(!urlR.test(req.body.image)){
        return res.sendStatus(400)
    }

    if(req.body.stockTotal<=0){
        return res.sendStatus(400)
    }

    if(req.body.pricePerDay<=0){
        return res.sendStatus(400)
    }
    
    if(category.length===0){
        return res.sendStatus(409)
    }

    if(game.length>0){
        return res.sendStatus(409)
    }
    next();
}