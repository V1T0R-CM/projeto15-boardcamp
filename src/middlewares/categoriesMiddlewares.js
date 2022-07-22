import connection from "../db/database.js";
import categoriesSchemas from "../schemas/categoriesSchemas.js";

export async function postCategoriesValidation(req, res, next){
    const validation = categoriesSchemas.validate(req.body);

    if(validation.error){
        return res.sendStatus(400)
    }
    
    const { rows: categories } = await connection.query(`SELECT * FROM categories WHERE name = '${req.body.name}'`);
    
    if(categories.length>0){
        return res.sendStatus(409)
    }

    next();
}