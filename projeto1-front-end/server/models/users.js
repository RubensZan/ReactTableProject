'use strict';
const { Client } = require('pg');

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'React-Table-Project-DB',
    password: 'admin',
    port: 5432,
});

module.exports = function getUserList() {

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
        let selectUsersQuery = ` SELECT * FROM users_data.users`;

        function handleSuccess(res) {
            result.data = res.rows;
            db.end();
            return result;
        }

        return db.query(selectUsersQuery).then(handleSuccess).catch(handleError)
    }

    return db.connect().then(executeQuery).catch(handleError)

}






































    // let selectCarsQuery = ` SELECT * FROM cars where car_id < 6`;
    // let selectJobsQuery = ` SELECT * FROM job where job_id < 6`;
    // let selectProductsQuery = ` SELECT * FROM products where product_id < 6`;
    // let selectAccessQuery = ` SELECT * FROM access where access_id < 6`;
    // let selectAddressQuery = ` SELECT * FROM address where address_id < 6`;

//     const allQuerys = [
//         selectUsersQuery,
//         // selectCarsQuery,
//         // selectJobsQuery,
//         // selectProductsQuery,
//         // selectAccessQuery,
//         // selectAddressQuery
//     ];
//     const allNames = [
//         'usersList',
//         // 'carsList',
//         // 'jobsList',
//         // 'productsList',
//         // 'accessList',
//         // 'addressList'
//     ];
//     // Ler arquivos


//     // let allDataReturn = []; 
//     let usersList; 

//     db.connect().then(async () => {
//         // console.log('--- db connected')
//         // db.query("SET search_path TO 'users_data';")


//         db.end();
//     })

//     function selectData(query, name) {
//         // console.log('-------------------------- comecando nova query --------------------------')
//         const executeQuery = new Promise(
//             (resolve, reject) => {
//                 db.query(query, (err, result) => {

//                     if (err) {
//                         console.log('Erro ao executar select')
//                         console.log(err)
//                         reject()
//                     } else {
//                         console.log('select executado com sucesso')
//                         // console.log(result)
//                         // let returnDataList = {[name] : result.rows}
//                         // allDataReturn.push(returnDataList); 
//                         usersList = result.rows; 
//                         resolve()
//                         return usersList; 
//                     }
//                 })
//             }
//         )
//         return executeQuery
//     }

// };
