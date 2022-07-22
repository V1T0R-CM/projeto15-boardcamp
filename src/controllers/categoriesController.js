import connection from "../db/database.js";

export async function postCategories(req, res){
    console.log(req.body.name)
    await connection.query(
        `INSERT INTO categories (name) 
          VALUES ('${req.body.name}')`
    );
    return res.sendStatus(201)
}