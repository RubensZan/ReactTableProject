'use strict';
const requisitionHistory = require('../models/requisitionsHistory');

exports.listRequisitionsHistory = async function (req, res){
    let requisitionHistoryList = await requisitionHistory();
    let historyResult = [];
    if(!requisitionHistoryList.err){
        requisitionHistoryList.data.map( history =>{ 
            let accessPath = history.access_path;
            let userAgent = history.user_agent;
            let userIp = history.user_ip;
            let date = JSON.stringify(history.inclusion_date );
            let year = date.substr(1, 4);
            let month = date.substr(6, 2);
            let day = date.substr(9, 2);
            let hour = date.substr(12, 2);
            let minutes = date.substr(15, 2);
            let seconds = date.substr(18, 2);
            let inclusionDate = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
            historyResult.push({accessPath,userAgent,userIp,inclusionDate})
        })
        // historyResult = requisitionHistoryList.data; 
    }
    else 
        historyResult = requisitionHistoryList.err;
    res.json(historyResult); 
}