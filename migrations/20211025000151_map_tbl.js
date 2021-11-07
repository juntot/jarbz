
exports.up = function(knex) {
  return knex.schema.createTable('MAP_TBL', function(table) {
    table.string('location').primary();
    table.string('address');
    table.string('siteContactPerson');
    table.string('siteContactNum');
    table.string('_idcontractor');
    table.string('_saqfileurl');
    table.boolean('docstat').defaultTo(0);
    table.boolean('status').defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('MAP_TBL');
};
