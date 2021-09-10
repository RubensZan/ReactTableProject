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
        let selectUsersQuery = ` SELECT users.user_id, birth_date, users.name, title, salary, currency_symbol, address
        FROM users_data.users
            left join users_data.users_job
            on users.user_id = users_job.user_id
                left join users_data.job 
                on users_job.job_id = job.job_id order by user_id asc; `;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectUsersQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}
