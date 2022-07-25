import connection from "../db/database.js";
import customersSchemas from "../schemas/customersSchemas.js";

export async function customersValidation(req, res, next){
    let date1 = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/;
    let date2 = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/;
    const validation = customersSchemas.validate(req.body);

    if(validation.error){
        return res.sendStatus(400)
    }
    
    if(req.body.cpf.length!==11 && !isNaN(req.body.cpf)){
        return res.sendStatus(400)
    }

    if(req.body.cpf.length !== 10 && req.body.phone.length!==11){
        return res.sendStatus(400)
    }

    if(!date1.test(req.body.birthday) && !date2.test(req.body.birthday)){
        return res.sendStatus(400)
    }

    const { rows: customers} = await connection.query(`SELECT * FROM customers WHERE cpf = '${req.body.cpf}'`);

    
    if(req.params.id){
        const { rows: costumerCpf } = await connection.query(`SELECT cpf FROM customers WHERE id = '${req.params.id}'`);
        if(costumerCpf.length===0){
            return res.sendStatus(400)
        }

        else if (customers.length===1 && costumerCpf[0].cpf!==customers[0].cpf){
            return res.sendStatus(409)
        }
    }

    if(customers.length>0){
        return res.sendStatus(409)
    }

    next();
}