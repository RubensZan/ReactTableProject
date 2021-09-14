'use strict';
module.exports = function (app) {
    var requisitions = require('../controllers/requisitionHistory');

    app.route('/listRequisitionHistory')
        .get(requisitions.listRequisitionsHistory)
        

};