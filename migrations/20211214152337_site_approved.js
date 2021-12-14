
exports.up = function(knex) {
  return knex.schema.createTable('SITE_APPROVE', function(table) {
      table.string('_location').primary();
      table.string('_partner');
      table.string('teamName');
      table.string('_createdby');
      table.string('_updatedby');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('status').defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('SITE_APPROVE')
};
