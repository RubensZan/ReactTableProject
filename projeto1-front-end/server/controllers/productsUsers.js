'use strict';
const modelFunc = require('../models/productsUsers');

exports.list_all_consumers = async function (req, res) {
    let result = await modelFunc(); 
    // let objectLength = Object.keys(result.data).length; 
    let myResult = new Array();  
    if (!result.err){
        // adjusting the users data received from the data base
        result.data.map(user=>{
            // console.log(user);
            let userBirthDate;
            let userName;
            let userId; 
            let productId = user.product_id; 
            if (user.name){
                userId = user.user_id; 
                userName = user.name.replace(/\s+/g, ' ').trim();
                let date = JSON.stringify(user.birth_date);
                let year = date.substr(1,4); 
                let month = date.substr(6,2);
                let day = date.substr(9,2);
                let hour = date.substr(12,2);
                let minutes = date.substr(15,2);
                let seconds = date.substr(18,2);
                userBirthDate = day+"/"+month+"/"+year+" "+hour+":"+minutes+":"+seconds; 
            }
            else {
                userBirthDate = null;
                userName = null;
                userId = null 
            }
            if (myResult[productId])
                myResult[productId].push({productId,userId, userName, userBirthDate});  
            else
                myResult[productId] = [{productId,userId, userName, userBirthDate}];  
        })
    }
    else {
        myResult = result; 
    }
    res.json(myResult);
};