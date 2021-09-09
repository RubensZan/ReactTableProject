'use strict';
const modelFunc = require('../models/usersCars');

exports.list_users_cars = async function (req, res) {
    let result = await modelFunc();  
    let myResult = new Array(); 
    
    if (!result.err){
        // adjusting the users cars data received from the data base
        result.data.map(userCars=>{
            let userId = userCars.user_id; 
            let carName = userCars.name ? userCars.name.replace(/\s+/g, ' ').trim() : null; 
            let fuel = userCars.fuel ? userCars.fuel.replace(/\s+/g, ' ').trim() : null;
            let manufacturer = userCars.manufacturer ? userCars.manufacturer.replace(/\s+/g, ' ').trim() : null;
            let model = userCars.model ? userCars.model.replace(/\s+/g, ' ').trim() : null;
            let type = userCars.type ? userCars.type.replace(/\s+/g, ' ').trim() : null;
            if (myResult[userId])
                myResult[userId].push({carName, fuel, manufacturer, model, type});
            else 
                myResult[userId] = [{userId,carName, fuel, manufacturer, model, type}];   
        })
    }
    else {
        myResult = result; 
    }

    res.json(myResult)
};