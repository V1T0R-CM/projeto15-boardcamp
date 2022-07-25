import connection from "../db/database.js";

export async function postCategories(req, res){
    await connection.query(
        `INSERT INTO categories (name) 
          VALUES ('${req.body.name}')`
    );
    
    return res.sendStatus(201)
}

export async function getCategories(req, res){
    const { rows: categories } = await connection.query(`SELECT * FROM categories`);
    
    return res.status(200).send(categories)
}