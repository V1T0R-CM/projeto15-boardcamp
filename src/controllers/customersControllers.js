import connection from "../db/database.js";


export async function postCustomers(req, res){
    await connection.query(
        `INSERT INTO customers(name, phone, cpf, birthday) 
        VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.cpf}', '${req.body.birthday}')`
    );
    return res.sendStatus(201);
}