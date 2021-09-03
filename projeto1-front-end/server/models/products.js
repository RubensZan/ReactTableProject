'use strict';
const { Client } = require('pg');


module.exports = function getProductsList() {
    const db = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'React-Table-Project-DB',
        password: 'admin',
        port: 5432,
    });

    const result = {
        err: null,
        data: null
    };

    function handleError(err) {
        console.log("ERRO NO MODEL/PRODUCTS", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        let selectProductsQuery = ` SELECT * FROM users_data.products`;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectProductsQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}