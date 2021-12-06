exports.up = function(knex) {
  return knex.schema.createTable('PARTNER_TBL', function(table) {
    table.string('_userId').primary();
    table.string('_email');
    table.string('region');
    table.string('bankNumber');
    table.string('bankName');
    table.string('bankBranch');
    // table.jsonb('documents').defaultTo({});
    // table.jsonb('team').defaultTo([]);
    
    table.longtext('documents').defaultTo('{}');
    table.longtext('team').defaultTo('[]');
    /* team status basis
    * 0 rejected
    * 1 pending
    * 2 approved
    */
    table.longtext('commercialRemarks');
    table.longtext('technicalRemarks');
    table.text('inspectEval');
    table.text('finalEval');
    table.text('remarks');
    table.string('_createdby');
    table.string('_updatedby');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable();
    table.integer('isUpdatedTeam').defaultTo(-1);
    table.integer('status').defaultTo(1);
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('PARTNER_TBL');
};

