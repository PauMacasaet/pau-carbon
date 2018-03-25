const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring')
        .join('client', 'client.accountName', '=', 'case_monitoring.customer')
        .leftJoin('activities', 'activities.trackingNo', '=', 'case_monitoring.glocalId')
        .distinct('case_monitoring.glocalId')
        .select('activities.assignedSystemsEngineer', 'case_monitoring.vendorCaseId', 'case_monitoring.dateIdCreated', 'client.accountManager', 'case_monitoring.case_status', 'case_monitoring.caseDescription', 'case_monitoring.caseTitle', 'case_monitoring.customer', 'case_monitoring.dateRaised', 'case_monitoring.productName', 'case_monitoring.severity', 'case_monitoring.systemsEngineerLead', 'case_monitoring.vendor')
        .groupBy('case_monitoring.glocalId', 'activities.assignedSystemsEngineer', 'client.accountManager')
        .orderBy('glocalId', 'asc');
    },
    getOne(glocalId) {
        return knex('case_monitoring').where('glocalId', glocalId);
    },
    create(case_mon) {
        return knex('case_monitoring').insert(case_mon, '*');
    },
    update(glocalId, case_monitoring) {
        return knex('case_monitoring').where('glocalId', glocalId).update(case_monitoring);
    }, 
    delete(glocalId) {
        return knex('case_monitoring').where('glocalId', glocalId).del();
    }
}