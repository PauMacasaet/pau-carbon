const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(assignedSystemsEngineer) {
        return knex('case_monitoring')
        .where('assignedSystemsEngineer', '@>', assignedSystemsEngineer);
    }
}