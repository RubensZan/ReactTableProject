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
        let selectProductsQuery = `
        SELECT products.product_id, products.buyed_appliance, products.buyed_bussiness_tecnology, products.buyed_commerce_department, products.company_name, products.product_name, products.description, products.material, products.price, products.buyed_bussiness_industry ,
            users.user_id,birth_date, users.name
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