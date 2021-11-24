const moment = require('moment');
exports.up = function(knex) {
  return knex.schema.createTable('USERS_TBL', function(table) {
    table.string('userId').primary().defaultTo(new Date().valueOf());
    table.string('avatar');
    table.string('email');
    table.string('password').notNullable();
    table.string('role');
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('middleName');
    table.string('address');
    table.string('contactNum');
    table.string('civilStatus');
    table.date('birthDate').defaultTo(moment().format('YYYY-MM-DD'));
    table.integer('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.unique('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('USERS_TBL');
};
