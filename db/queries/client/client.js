const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('client').select('accountName', knex.raw('contact_details[0:1][1] AS Customer_Name, contact_details[2:2][2] AS Email, contact_details[3:3][3] AS Contact_Number'), 'company_address', 'accountManager AS Assigned_AM');
    },
    getOne(accountName) {
        return knex('client').where('accountName', accountName);
    }, 
    create(client) {
        return knex('client').insert(client, '*');
    },
    update(accountName, client) {
        return knex('client').where('accountName', accountName).update(client);
    },
    delete(accountName) {
        return knex('client').where('accountName', accountName).del();
    }
}