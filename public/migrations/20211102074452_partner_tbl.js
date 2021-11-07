exports.up = function(knex) {
  return knex.schema.createTable('PARTNER_TBL', function(table) {
    table.string('userId_').primary();
    // table.jsonb('documents').defaultTo({});
    // table.jsonb('team').defaultTo([]);
    
    table.longtext('documents').defaultTo({});
    table.longtext('team').defaultTo([]);

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('PARTNER_TBL');
};
