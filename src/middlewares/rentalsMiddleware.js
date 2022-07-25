import connection from "../db/database.js";
import rentalsSchemas from "../schemas/rentalsSchemas.js";

export async function postRentalsValidation(req, res, next){
    const validation = rentalsSchemas.validate(req.body);
    if(validation.error){
        return res.sendStatus(400);
    }

    const { rows: customers} = await connection.query(`SELECT * FROM customers WHERE id = '${req.body.customerId}'`);
    if (customers.length===0){
        return res.sendStatus(400);
    }

    const { rows: games} = await connection.query(`SELECT * FROM games WHERE id = '${req.body.gameId}'`);
    if (games.length===0){
        return res.sendStatus(400);
    }

    if (req.body.daysRented<=0){
        return res.sendStatus(400);
    }

    if (games[0].stockTotal===0){
        return res.sendStatus(400);
    }
    next();
}