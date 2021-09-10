'use strict';
const modelFunc = require('../models/usersAccess');

exports.list_users_access = async function (req, res) {
    let result = await modelFunc();  
    let myResult = new Array(); 
    
    if (!result.err){
        // adjusting the users access data received from the data base
        result.data.map(userAccess=>{
            let userId = userAccess.user_id; 
            let businessTechnology = userAccess.business_technology ? userAccess.business_technology.replace(/\s+/g, ' ').trim() : null; 
            let ipAddress = userAccess.ip_address ? userAccess.ip_address.replace(/\s+/g, ' ').trim() : null;
            let macAddress = userAccess.mac_address ? userAccess.mac_address.replace(/\s+/g, ' ').trim() : null;
            let userAgent = userAccess.user_agent ? userAccess.user_agent.replace(/\s+/g, ' ').trim() : null; 
            let userLogin = userAccess.user_login ? userAccess.user_login.replace(/\s+/g, ' ').trim() : null; 

            if (myResult[userId])
                myResult[userId].push({userId, businessTechnology,ipAddress,macAddress,userAgent,userLogin});
            else 
                myResult[userId] = [{userId,businessTechnology,ipAddress,macAddress,userAgent,userLogin}];   
        })
    }
    else {
        myResult = result; 
    }

    res.json(myResult)
};