
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('PAGES_TBL').del()
    .then(function () {
      // Inserts seed entries
      return knex('PAGES_TBL').insert([
        {id: 1, title: 'SAQ Sites',                   navlink: '/saq-sites'},
        {id: 2, title: 'SAQ Files',                   navlink: '/saq-files'},
        {id: 3, title: 'Site Evaluation',     navlink: '/site-evaluation-summary'},
        
        // main audit
        {id: 12, title: 'Audit',  navlink: '/partner-evaluation'},
        {id: 4, title: 'Team Evaluation',  navlink: '/partner-evaluation'},
        {id: 11, title: 'Team Registration',  navlink: '/partner-registration'},

        // operation
        {id: 5, title: 'Site Technical Evaluation',   navlink: '/site-technical-evaluation'},
        {id: 6, title: 'Site Technical Summary',      navlink: '/site-technical-summary'},
        {id: 7, title: 'Site Construction',           navlink: '/site-construction'},

        // legal
        {id: 8, title: 'Site legal assessment',       navlink: '/site-legal-assessment'},
        {id: 9, title: 'Site legal Summary',          navlink: '/site-legal-summary'},

        // GM
        {id: 10, title: 'Approve Sites',              navlink: '/approved-site'},
      ]);
    });
};
