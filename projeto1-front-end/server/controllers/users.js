'use strict';
const modelFunc = require('../models/users');

exports.list_all_users = async function (req, res) {
    let result = await modelFunc(); 
    let myResult = []; 
    if (!result.err){
        result.data.map(user=>{
            // console.log(user);
            let userId = user.user_id; 
            let userName = user.name.replace(/\s+/g, ' ').trim();
            let date = JSON.stringify(user.birth_date);
            let year = date.substr(1,4); //OK
            let month = date.substr(6,2);
            let day = date.substr(9,2);
            let hour = date.substr(12,2);
            let minutes = date.substr(15,2);
            let seconds = date.substr(18,2);
            let userBirthDate = day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds; 
            myResult.push({userId, userName, userBirthDate});  
        })
    }
    res.json(myResult);

};