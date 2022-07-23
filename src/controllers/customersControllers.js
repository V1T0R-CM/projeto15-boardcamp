import connection from "../db/database.js";


export async function postCustomers(req, res){
    await connection.query(
        `INSERT INTO customers(name, phone, cpf, birthday) 
        VALUES ('${req.body.name}', '${req.body.phone}', '${req.body.cpf}', '${req.body.birthday}')`
    );
    return res.sendStatus(201);
}

export async function putCustomers(req, res){
    await connection.query(
        `UPDATE customers 
        SET name = '${req.body.name}', phone = '${req.body.phone}', cpf = '${req.body.cpf}', birthday = '${req.body.birthday}'
        WHERE id = ${req.params.id}`
    );
    return res.sendStatus(201);
}