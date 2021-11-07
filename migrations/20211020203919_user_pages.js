
exports.up = function(knex) {
  return knex.schema.createTable('USERPAGE_TBL', function(table) {
    table.string('userId').primary();
    table.jsonb('pages').defaultTo({});
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('USERPAGE_TBL');
};
