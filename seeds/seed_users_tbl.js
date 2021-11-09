
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('USERS_TBL').del()
    .then(function () {
      // Inserts seed entries
      
      // admin, 4lBQyBA
      return knex('USERS_TBL').insert([
        {userId: 'U1635143287120', email: 'admin', password: 'admin', role: 'admin', firstName: 'admin', lastName: 'admin', middleName: 'admin', address: 'admin address', contactNum: '09171234567', birthDate: '2021-10-25'},
        {userId: 'U1635143327211', email: 'user', password: 'user',  role: 'standard', firstName: 'user', lastName: 'user', middleName: 'user', address: 'user address', contactNum: '09171234567', birthDate: '2021-10-25'},
        {userId: 'U1635147412825', email: 'partner', password: 'partner', role: 'contractor', firstName: 'partner', lastName: 'partner', middleName: 'partner', address: 'partner address', contactNum: '09171234567', birthDate: '2021-10-25'},
      ]);
    });
};
