import connection from "../db/database.js";
import costumersSchemas from "../schemas/customersSchemas.js";

export async function postCustomersValidation(req, res, next){
    let date1 = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/;
    let date2 = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/;
    const validation = costumersSchemas.validate(req.body);

    if(validation.error){
        return res.sendStatus(400)
    }
    
    if(req.body.cpf.length!==11 && isNaN(eq.body.cpf)){
        return res.sendStatus(400)
    }

    if(req.body.cpf.length !== 10 && req.body.phone.length!==11){
        return res.sendStatus(400)
    }

    if(!date1.test(req.body.birthday) && !date2.test(req.body.birthday)){
        return res.sendStatus(400)
    }
    const { rows: costumers} = await connection.query(`SELECT * FROM customers WHERE cpf = '${req.body.cpf}'`);

    if(costumers.length>0){
        return res.sendStatus(409)
    }

    next();
}