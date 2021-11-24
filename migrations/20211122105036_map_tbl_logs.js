
exports.up = function(knex) {
  return knex.schema.createTable('MAP_LOGS', function(table) {
    table.string('location').primary();
    table.text('action');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('MAP_LOGS');
};
