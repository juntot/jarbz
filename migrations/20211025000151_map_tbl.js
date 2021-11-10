
exports.up = function(knex) {
  return knex.schema.createTable('MAP_TBL', function(table) {
    table.string('location').primary();
    table.string('address');
    table.string('siteContactPerson');
    table.string('siteContactNum');
    table.string('_idcontractor'); // no lingking
    table.string('_saqfileurl'); // no linking
    table.string('_createdby');
    table.string('_updatedby');

    // checklist
    table.boolean('taxDec').defaultTo(0);
    table.boolean('taxClearance').defaultTo(0);
    table.boolean('sketchPlan').defaultTo(0);
    table.boolean('landTitle').defaultTo(0);
    table.boolean('coordPhoto').defaultTo(0);
    table.boolean('photoLandOwner').defaultTo(0);
    table.boolean('visinityPlan').defaultTo(0);
    table.boolean('LIS').defaultTo(0);

    table.boolean('docstat').defaultTo(0);
    table.boolean('status').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('MAP_TBL');
};
