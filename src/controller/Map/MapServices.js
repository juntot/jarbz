const BaseRepository = require("../../services/BaseRepository");
const APP = '[MapServices]';
class MapServices extends BaseRepository{
  constructor(){
    super('MAP_TBL');
  }

  /*
  *  AUDIT DEPT
  */
  // add site map
  async insert(body){
    await this._knex(this._table).insert(body);
    return body;
  }
  
  
  // bulk insert site map
  async insertMany(body){
    console.log(APP, '[insertMany]');

    await this._knex(this._table).insert(body)
          .onConflict('location')
          .ignore();
    return body;
  }

  // site summary
  async siteSummary(from, to, status) {
    console.log(APP, '[siteSummary]');

    return await this._knex(this._table)
      .whereBetween(`${this._table}.created_at`, [from, to])
      .andWhere('auditPercent', '100')
      .andWhere('status', status)
      .andWhere('docstat', 0)
      .select();
  }

  /*
  *  OPERATION DEPT
  */
  // site tech evaluation
  async siteTechEvaluation(from, to, status) {
    console.log(APP, '[siteTechEvaluation]');

    const query = this._knex.select('site.*', 'siteTech.siteSurvey', 
    'siteTech.soilTest', 'siteTech.siteEvalForm', 'siteTech.techEval',
    'siteTech._evaluatedby', 'siteTech.updated_at', 'siteTech.status',
    'siteTech.techEvalPercent'
    )
    .from({ site: this._table })
    .leftJoin({ siteTech: 'SITE_TECH_EVAL' }, 
    'site.location', '=', 'siteTech._location')
    .whereBetween(`site.created_at`, [from, to])

    // pending
    if(status == 1) {
      // console.log(query.andWhere('siteTech.status', status)
      // .orWhere('siteTech.status', null).toString());
      // return await query.andWhere('site.status', status)
      //                 .andWhere('siteTech.status', 1);
      return await query.andWhere('site.status', 2)
                       .andWhere('siteTech.status', null)
                       .orWhere('siteTech.status', 1);
    }
    // approved
    if(status == 2)
    return await query.andWhere('siteTech.status', status);

  }

  async siteUpdatetechicalEval(body){
    console.log(APP, '[siteUpdatetechicalEval]');
    return await this.insertOrUpdate('SITE_TECH_EVAL', body)
  }

  // site summary
  async siteTechEvalSummary(from, to, status) {
    console.log(APP, '[siteTechEvalSummary]');
    

    const query = this._knex.select('site.*', 'siteTech.siteSurvey', 
    'siteTech.soilTest', 'siteTech.siteEvalForm', 'siteTech.techEval',
    'siteTech._evaluatedby', 'siteTech.updated_at', 'siteTech.status',
    'siteTech.techEvalPercent'
    )
      .from({site: this._table})
      .innerJoin({siteTech: 'SITE_TECH_EVAL'}, 'site.location', '=', 'siteTech._location')
      .whereBetween(`site.created_at`, [from, to])
      // .andWhere('siteTech.status', status);// pending
    
      // for approval
    if(status == 1)
    return await query.andWhere('siteTech.techEvalPercent', '100')
                       .andWhere('siteTech.status', status);

    // approved
    if(status == 2)
    return await query.andWhere('siteTech.status', status);
  }

  /*
  *  LEGAL DEPT
  */
  // site tech evaluation
  async siteLegalAssess(from, to, status) {
    console.log(APP, '[siteLegalAssess]');

    const query = this._knex.select('site.*', 'siteLegal.contracts', 
    'siteLegal.LCR', 'siteLegal.towerConsPermit', 'siteLegal.fencingPermit',
    'siteLegal.excavationPermit', 'siteLegal.bldgPermit', 'siteLegal.cenroPermit',
    'siteLegal._legalAssessBy', 'siteLegal.updated_at', 'siteLegal.status',
    'siteLegal.legalAssessPercent'
    )
    .from({ site: this._table })
    .innerJoin({siteTech: 'SITE_TECH_EVAL'}, 'site.location', '=', 'siteTech._location')
    .leftJoin({ siteLegal: 'SITE_LEGAL_ASSESS' }, 
    'site.location', '=', 'siteLegal._location')
    .whereBetween(`site.created_at`, [from, to])
    // .andWhere('site.status', status);
    
    // pending
    if(status == 1)
    return await query.andWhere('siteTech.status', 2)
                       .andWhere('siteLegal.status', null)
                       .orWhere('siteLegal.status', status);
    // approved
    if(status == 2)
    return await query.andWhere('siteLegal.status', status);
  }

  async siteUpdateLegalAssess(body){
    console.log(APP, '[siteUpdateLegalAssess]');
    return await this.insertOrUpdate('SITE_LEGAL_ASSESS', body)
  }

  // site summary
  async siteLegalAssessSummary(from, to, status) {
    console.log(APP, '[siteLegalAssessSummary]');
    

    const query = this._knex.select('site.*', 'siteLegal.contracts', 
    'siteLegal.LCR', 'siteLegal.towerConsPermit', 'siteLegal.fencingPermit',
    'siteLegal.excavationPermit', 'siteLegal.bldgPermit', 'siteLegal.cenroPermit',
    'siteLegal._legalAssessBy', 'siteLegal.updated_at', 'siteLegal.status',
    'siteLegal.legalAssessPercent'
    )
      .from({site: this._table})
      .innerJoin({siteLegal: 'SITE_LEGAL_ASSESS'}, 'site.location', '=', 'siteLegal._location')
      .whereBetween(`site.created_at`, [from, to])
      .andWhere('siteLegal.status', status);

    if(status == 1)
    return await query.andWhere('siteLegal.legalAssessPercent', '100')
                       .andWhere('siteLegal.status', status);

    // approved
    if(status == 2)
    return await query.andWhere('siteLegal.status', status);
  }

}
module.exports = new MapServices; 