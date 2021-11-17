
exports.up = function(knex) {
  return knex.schema.createTable('SITE_TECH_EVAL', function(table) {
      table.string('_location').primary();
      table.boolean('siteSurvey').defaultTo(0);
      table.boolean('soilTest').defaultTo(0);
      table.boolean('siteEvalForm').defaultTo(0);
      // table.boolean('techEval').defaultTo(0);
      table.string('techEvalPercent');
      table.string('_evaluatedby');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('status').defaultTo(1);

      table.text('actionRemarks');
      table.string('_actionby');
      table.timestamp('action_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('SITE_TECH_EVAL')
};
