
exports.up = function(knex) {
  return knex.schema.createTable('PAGES_TBL', function(table) {
    table.increments('id');
    table.string('title');
    table.string('groupmain');
    table.string('groupsub');
    table.string('navlink').defaultTo('#/');
    table.boolean('status').defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('PAGES_TBL');
};
 