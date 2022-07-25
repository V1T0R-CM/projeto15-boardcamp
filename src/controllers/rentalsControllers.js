import connection from "../db/database.js";
import dayjs from "dayjs";


export async function getRentals(req, res){
    const { rows: rentals} = await connection.query(`SELECT * FROM rentals`);
    const { rows: customers} = await connection.query(`SELECT id, name FROM customers`);
    const { rows: games} = await connection.query(`SELECT games.id, games.name, games."categoryId", categories.name as categoryName FROM games
    JOIN categories ON games."categoryId" = categories.id`);
    
    const rentalsSumary = rentals.map(rental=>{
        let customer = customers.filter(customer => customer.id === rental.customerId)
        let game = games.filter(game => game.id === rental.gameId)
        return {...rental, customer: customer[0], game: game[0]}
    });


    if(req.query.customerId){
        return res.status(200).send(rentalsSumary.filter(rental=>rental.customerId === Number(req.query.customerId)));
    }

    if(req.query.gameId){
        return res.status(200).send(rentalsSumary.filter(rental=>rental.gameId === Number(req.query.gameId)));
    }

    return res.status(200).send(rentalsSumary);
}

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

function dayInterval(iniDay, finDay){
    let dataSplitFin=finDay.split("-");
    let dataSplitIni= iniDay.split("-");
    
    return (Number(dataSplitFin[0])-Number(dataSplitIni[0]))*360+(Number(dataSplitFin[1])-Number(dataSplitIni[1]))*30+(Number(dataSplitFin[2])-Number(dataSplitIni[2]));
}

export async function postEndRental(req, res){
    const { rows: rental} = await connection.query(`SELECT * FROM rentals WHERE id = '${req.params.id}'`);
    const { rows: game} = await connection.query(`SELECT * FROM games WHERE id = '${rental[0].gameId}'`);
    const daysWithGame = dayInterval(rental[0].rentDate.toISOString().substring(0, 10), dayjs().format("YYYY-MM-DD"))
    const delay = daysWithGame-rental[0].daysRented < 0 ? 0 : daysWithGame-rental[0].daysRented

    await connection.query(
        `UPDATE rentals
        SET "returnDate" = '${dayjs().format("YYYY-MM-DD")}', "delayFee" = ${delay*game[0].pricePerDay}
        WHERE id = ${req.params.id}`
    );

    return res.sendStatus(200);
}

export async function deleteRental(req, res){
    await connection.query(
        `DELETE FROM rentals 
        WHERE id = ${req.params.id}`
    );

    return res.sendStatus(200);
}
