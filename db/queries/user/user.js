const knex = require('../../knex');

module.exports = {
  getAll () {
    return knex('user')
      .select(
        'userid',
        'fullName',
        'username',
        'email',
        'contactNumber',
        'dateCreated',
        'position',
        'is_active'
      )
      .orderBy('userid', 'asc');
  },
  getOne (id) {
    return knex('user')
      .select(
        'userid',
        'fullName',
        'username',
        'email',
        'contactNumber',
        'dateCreated',
        'position',
        'is_active'
      )
      .where('userid', id)
      .first();
  },
  getOneByName(name) {
    return knex('user')
      .where('fullName', name);
  },
  getOneByContact (contactNumber) {
    return knex('user')
      .where('contactNumber', contactNumber);
  },
  getOneByEmail (email) {
    return knex('user')
      .where('email', email)
      .first();
  },
  create (user) {
    const knexQuery = knex('user')
      .insert(user, 'userid'); // try '*'
      
    return knexQuery.then(ids => {
      return ids[0];
    });
  },
  update(userid, user) {
    const knexQuery = knex('user')
      .where('userid', userid)
      .update(user, '*');

    return knexQuery.then(ids => {
      return ids[0];
    });
  },
  delete(userid) {
    return knex('user')
      .where('userid', userid)
      .del();
  }
}
