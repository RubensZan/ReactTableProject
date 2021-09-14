'use strict';
const { Client } = require('pg');


module.exports = function getUserList() {
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
        console.log("ERRO NO MODEL/USER", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        // let selectUsersQuery = ` SELECT * FROM users_data.users`;
        let selectUsersQuery = `      
        SELECT users.user_id, birth_date, users.name, job.job_id, job.title, job.address as job_address, job.salary, job.currency_symbol , 
        products.product_id, products.buyed_appliance, products.buyed_bussiness_tecnology, products.buyed_commerce_department, products.company_name, products.product_name, products.description, products.material, products.price, products.buyed_bussiness_industry , 
        access.access_id, access.business_technology, access.ip_address, access.mac_address, access.user_agent, access.user_login, 
        cars.car_id, cars.fuel, cars.manufacturer, cars.model, cars."name" as car_name, cars."type" as car_type,
        address.address_id, address.street_address, address.street_name, address.street_sufix, address.city, address.city_prefix, address.secondary_address, address.direction, address.state, address.country 
        FROM users_data.users
            left join users_data.users_job
            on users.user_id = users_job.user_id
                left join users_data.job 
                on users_job.job_id = job.job_id 
                    left join users_data.users_products 
                    on users.user_id = users_products.user_id
                        left join users_data.products 
                        on users_products.product_id = products.product_id 	
                            left join users_data.users_access 
                            on users.user_id = users_access.user_id
                                left join users_data.access 
                                on users_access.access_id = access.access_id
                                    left join users_data.users_address
                                    on users.user_id = users_address.user_id
                                        left join users_data.address
                                        on users_address.address_id = address.address_id
                                            left join users_data.users_cars 
                                            on users.user_id = users_cars.user_id
                                                left join users_data.cars
                                                on users_cars.car_id = cars.car_id 
                                        
                                            order by user_id asc;`;


        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectUsersQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}
