import connection from "../db/database.js";
import rentalsSchemas from "../schemas/rentalsSchemas.js";

export async function postRentalsValidation(req, res, next){
    const validation = rentalsSchemas.validate(req.body);
    const { rows: customers} = await connection.query(`SELECT * FROM customers WHERE id = '${req.body.customerId}'`);
    const { rows: games} = await connection.query(`SELECT * FROM games WHERE id = '${req.body.gameId}'`);

    if(validation.error){
        return res.sendStatus(400);
    }

    if (customers.length===0){
        return res.sendStatus(400);
    }

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

export async function postEndRentalValidation(req, res, next){
    const { rows: rental} = await connection.query(`SELECT * FROM rentals WHERE id = '${req.params.id}'`);
    
    if(rental.length===0){
        return res.sendStatus(404);
    }

    if(rental[0].returnDate){
        return res.sendStatus(400);
    }
    next()
}

export async function deleteRentalValidation(req, res, next){
    const { rows: rental} = await connection.query(`SELECT * FROM rentals WHERE id = '${req.params.id}'`);
    
    if(rental.length===0){
        return res.sendStatus(404);
    }

    if(!rental[0].returnDate){
        return res.sendStatus(400);
    }
    next()
}