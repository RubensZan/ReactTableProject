'use strict';
const requisitionHistory = require('../models/requisitionsHistory');

exports.listRequisitionsHistory = async function (req, res){
    let requisitionHistoryList = await requisitionHistory();
    let historyResult;
    if(!requisitionHistoryList.err)
        historyResult = requisitionHistoryList.data; 
    else 
        historyResult = requisitionHistoryList.err;
    res.json(historyResult); 
}