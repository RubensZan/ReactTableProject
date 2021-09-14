'use strict';
const { Client } = require('pg');


module.exports = function listRequisitionHistory() {
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
        console.log("ERRO NO MODEL/LISTREQUISITIONHISTORY", err);
        result.err = err;
        db.end();

        return result;
    }

    function executeQuery() {
        let selectRequestHistory = `
            select user_ip, user_agent, inclusion_date, access_path
            from users_data.requisition_data;`;
        

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectRequestHistory).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}