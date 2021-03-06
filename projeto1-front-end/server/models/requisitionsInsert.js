'use strict';
const { Client } = require('pg');


module.exports = function requisitionHandler(user_ip, user_agent,  access_path, user_date) {
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
        console.log("ERRO NO MODEL/REQUISITIONINSERT", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        let insertRequisition = `
        insert into users_data.requisition_data (user_ip, user_agent, inclusion_date, access_path)
            values ( '${user_ip}', '${user_agent}' ,'${user_date}', '${access_path}' );`;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(insertRequisition).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}