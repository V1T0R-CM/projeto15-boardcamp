import connection from "../db/database.js";
import dayjs from "dayjs";

export async function postRentals(req, res){
    const { rows: game} = await connection.query(`SELECT * FROM games WHERE id = '${req.body.gameId}'`);
    
    await connection.query(
        `UPDATE games
        SET "stockTotal" = ${game[0].stockTotal-1}
        WHERE id = ${req.body.gameId}`
    );
    
    await connection.query(
        `INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
        VALUES (${req.body.customerId}, ${req.body.gameId}, '${dayjs().format("YYYY-MM-DD")}', ${req.body.daysRented}, ${null}, ${game[0].pricePerDay*req.body.daysRented}, ${null})`
    );
    return res.sendStatus(201);
}