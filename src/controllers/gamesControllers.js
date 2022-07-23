import connection from "../db/database.js";


export async function postGames(req, res){
    await connection.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ('${req.body.name}', '${req.body.image}', ${req.body.stockTotal}, ${req.body.categoryId}, ${req.body.pricePerDay})`
    );
    return res.sendStatus(201);
}

export async function getGames(req, res){
    const { rows: games }=await connection.query(
        `SELECT games.*, categories.name as categoryName FROM games
        JOIN categories 
        ON games."categoryId" = categories.id`
    );

    const searchFilter = req.query.name;

    if(searchFilter){
        return res.status(200).send(games.filter(game => game.name.slice(0,searchFilter.length).toLowerCase()=== searchFilter.toLowerCase()))
    }
    return res.status(200).send(games)
}