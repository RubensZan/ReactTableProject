'use strict';
const { Client } = require('pg');


module.exports = function getUsersAccess() {
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
        let selectUsersQuery = ` 
        SELECT users.user_id, access.business_technology, access.ip_address, access.mac_address, access.user_agent, access.user_login
        FROM users_data.users
            left join users_data.users_access
            on users.user_id = users_access.user_id
                left join users_data."access"
                on users_access.access_id = access.access_id order by user_id asc; `;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectUsersQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}