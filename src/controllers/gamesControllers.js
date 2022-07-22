import connection from "../db/database.js";


export async function postGames(req, res){
    await connection.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
          VALUES ('${req.body.name}', '${req.body.image}', ${req.body.stockTotal}, ${req.body.categoryId}, ${req.body.pricePerDay})`
    );
    return res.sendStatus(201)
}