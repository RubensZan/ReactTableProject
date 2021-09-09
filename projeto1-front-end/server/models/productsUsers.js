'use strict';
const { Client } = require('pg');


module.exports = function getProductsConsumers() {
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
        console.log("ERRO NO MODEL/PRODUCTSUSERS", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        let selectProductsQuery = ` 
        select products.product_id , birth_date, users.name, users.user_id
        FROM users_data.products
            left join users_data.users_products
            on products.product_id = users_products.product_id 
                left join users_data.users 
                on users_products.user_id = users.user_id 
                            order by product_id asc;`;


        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectProductsQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}