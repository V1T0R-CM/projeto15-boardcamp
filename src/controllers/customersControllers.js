import connection from "../db/database.js";

export async function getCustomers(req, res){
    const { rows: customers }=await connection.query(
        `SELECT * FROM customers`
    );


    if(req.params.id){
        const { rows: customersByID}=await connection.query(
            `SELECT * FROM customers WHERE id = '${req.params.id}'`
        );

        if(customersByID.length===0){
            return res.sendStatus(404)
        }

        return res.status(200).send(customersByID)
    }

    const searchFilter = req.query.cpf;

    if(searchFilter){
        return res.status(200).send(customers.filter(customers => customers.cpf.slice(0,searchFilter.length)=== searchFilter))
    }
    
    return res.status(200).send(customers)
    
}

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