const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(severity) {
        return knex('case_monitoring')
        .where('severity', severity);
    }
}