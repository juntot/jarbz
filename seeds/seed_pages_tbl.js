
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('PAGES_TBL').del()
    .then(function () {
      // Inserts seed entries
      return knex('PAGES_TBL').insert([
        {id: 1, title: 'SAQ Sites',                   navlink: '/all-sites'},
        {id: 2, title: 'SAQ Files',                   navlink: '/saq-files'},
        {id: 3, title: 'Site Evaluation Summary',     navlink: '#/'},
        
        // main audit
        {id: 4, title: 'Partner Evaluation Summary',  navlink: '/partner-evaluator'},

        // operation
        {id: 5, title: 'Site Technical Evaluation',   navlink: '/site-tech-evaluator'},
        {id: 6, title: 'Site Technical Summary',      navlink: '/site-tech-summary'},
        {id: 7, title: 'Site Construction',           navlink: '/site-construction'},

        // legal
        {id: 8, title: 'Site legal assessment',       navlink: '/site-legal-assessment'},
        {id: 9, title: 'Site legal Summary',          navlink: '/site-legal-summary'},

        {id: 10, title: 'Approve Sites',              navlink: '/approved-site'},
      ]);
    });
};
