// 'use strict';
// const modelFunc = require('../models/users');

// exports.list_all_users = async function (req, res) {
//     let result = await modelFunc(); 
            //     // let objectLength = Object.keys(result.data).length; 
            //     // let myResult = new Array(new Array(objectLength)); 
//     let myResult = []; 
//     if (!result.err){
//         // adjusting the users data received from the data base
//         result.data.map(user=>{
//             // console.log(user);
//             let userId = user.user_id; 
//             let userName = user.name.replace(/\s+/g, ' ').trim();
//             let date = JSON.stringify(user.birth_date);
//             let year = date.substr(1,4); 
//             let month = date.substr(6,2);
//             let day = date.substr(9,2);
//             let hour = date.substr(12,2);
//             let minutes = date.substr(15,2);
//             let seconds = date.substr(18,2);
//             let userBirthDate = day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds; 
//             let jobTitle = user.title ? user.title.replace(/\s+/g, ' ').trim() : "Unemployed"; 
//             let salary = user.currency_symbol ? user.currency_symbol.replace(/\s+/g, ' ').trim()+" "+user.salary : []; 
//             myResult.push({userId, userName, userBirthDate,jobTitle, salary});  
//         })
//     }
//     else {
//         myResult = result; 
//     }
//     res.json(myResult);

// };



'use strict';
const modelFunc = require('../models/users');

exports.list_all_users = async function (req, res) {
    let result = await modelFunc();
    // let objectLength = Object.keys(result.data).length;
    // let myResult = new Array(new Array(objectLength));
    let myResult = [];
    let jobs = [];
    if (!result.err) {
        result.data.map(user => {
            let jobTitle = user.title ? user.title.replace(/\s+/g, ' ').trim() : null;
            let salary = user.currency_symbol ? user.currency_symbol.replace(/\s+/g, ' ').trim() + " " + user.salary : null;
            let address = user.address ? user.address.replace(/\s+/g, ' ').trim() : null; 
            let userId = user.user_id;
            if (!myResult[userId]) {
                let userName = user.name.replace(/\s+/g, ' ').trim();
                let date = JSON.stringify(user.birth_date);
                let year = date.substr(1, 4);
                let month = date.substr(6, 2);
                let day = date.substr(9, 2);
                let hour = date.substr(12, 2);
                let minutes = date.substr(15, 2);
                let seconds = date.substr(18, 2);
                let userBirthDate = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
                jobs = [{ jobTitle, salary, address }];
                myResult[userId] = {userId, userName, userBirthDate, jobs };
            }
            // if user already exists, new job and salary 
            else {
                // if is a new job, will push the new jobTitle and salary in the jobs 
                myResult[userId].jobs.push({jobTitle, salary, address});
            }
        })
    }
    else {
            myResult = result;
    }
    res.json(myResult);
};