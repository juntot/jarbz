
exports.up = function(knex) {
  return knex.schema.createTable('SITE_LEGAL_ASSESS', function(table) {
      table.string('_location').primary();
      table.boolean('contracts').defaultTo(0);
      table.boolean('LCR').defaultTo(0);
      table.boolean('towerConsPermit').defaultTo(0);
      table.boolean('fencingPermit').defaultTo(0);
      table.boolean('excavationPermit').defaultTo(0);
      table.boolean('bldgPermit').defaultTo(0);
      table.boolean('cenroPermit').defaultTo(0);
      table.string('legalAssessPercent');
      table.string('_legalAssessBy');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('status').defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('SITE_LEGAL_ASSESS')
};
