'use strict';
const { Client } = require('pg');


module.exports = function getUsersCars() {
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
        console.log("ERRO NO MODEL/USERSCARS", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        // let selectUsersQuery = ` SELECT * FROM users_data.users`;
        let selectUsersQuery = ` SELECT users.user_id ,fuel, manufacturer, model, cars.name, cars.type 
        FROM users_data.users
            left join users_data.users_cars
            on users.user_id = users_cars.user_id
                left join users_data.cars 
                on users_cars.car_id = cars.car_id
                order by users.user_id asc;`;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectUsersQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}