const BaseRepository = require("../../services/BaseRepository");
const APP = '[MapServices]';
class MapServices extends BaseRepository{
  constructor(){
    super('MAP_TBL');
  }

  // site list
  async siteList(knownKey, knownValue) {
    console.log(APP, '[siteList]');
    let result;
    try {
      result = this._knex(this._table)
          // not deleted
          //  -1 means deleted
          //  9 all sites
          console.log(knownValue);
          if(knownValue === 'all') {
            result = result.select();

          }else if(knownValue !== '-1' && knownValue !== 9){

            result = result.where({[knownKey]: knownValue})
            .andWhere({docstat: 1})
            .select();

          }else {
            result = result.where({docstat: 0})
            .select();
            // console.log(result.toString())
          }
          
      result  = await result;
          
    } catch (SQLError) {
      console.log(SQLError);
      throw new Error(SQLError);
    }
    return result;
  }
  /*
  *  AUDIT DEPT
  */
  // add site map
  async insert(body){
    try {
      await this._knex(this._table).insert(body); 
      return body;
    } catch (SQLError) {
      throw {
        message: SQLError.sqlMessage, 
        code: SQLError.errno
      };
      // throw new Error(SQLError.sqlMessage);
    }
    
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
  
  return await this._knex.select('site.*',
        this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._createdby) as _createdby`),

        this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._actionby) as _actionby`) 
      ) 
      .from({site: this._table})
      // .innerJoin({user: 'USERS_TBL'}, 'site.location', '=', 'siteTech._location')
      .whereBetween(`site.created_at`, [from, to])
      .andWhere('site.auditPercent', '100')
      .andWhere('site.status', status)
      .andWhere('site.docstat', 1)
  }

  /*
  *  OPERATION DEPT
  */
  // site tech evaluation
  async siteTechEvaluation(from, to, status) {
    console.log(APP, '[siteTechEvaluation]');

    const query = this._knex.select('site.*', 'siteTech.siteSurvey', 
    'site.created_at',
    'siteTech.soilTest', 'siteTech.siteEvalForm', 
    'siteTech.updated_at', 'siteTech.updated_at', 
    'siteTech.status', 'siteTech.techEvalPercent',
    'siteTech.actionRemarks', 'siteTech.action_date', 
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._createdby) as _createdby`),

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = siteTech._evaluatedby) as _evaluatedby`),
    
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
    from USERS_TBL subemp
      where subemp.userId = siteTech._actionby) as _actionby`)
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
    if(status !== 1)
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
    'site.created_at',
    'siteTech.soilTest', 'siteTech.siteEvalForm', 
    'siteTech.updated_at', 'siteTech.updated_at', 
    'siteTech.status', 'siteTech.techEvalPercent',
    'siteTech.actionRemarks', 'siteTech.action_date', 
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._createdby) as _createdby`),

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = siteTech._evaluatedby) as _evaluatedby`),
    
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
    from USERS_TBL subemp
      where subemp.userId = siteTech._actionby) as _actionby`)
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
    if(status !== 1)
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
    'siteLegal.created_at', 'siteLegal.updated_at', 'siteLegal.status',
    'siteLegal.legalAssessPercent', 'siteLegal.actionRemarks',
    'siteLegal._actionby', 'siteLegal.action_date',

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._createdby) as _createdby`),

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = siteLegal._legalAssessBy) as _legalAssessBy`),
    
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
    from USERS_TBL subemp
      where subemp.userId = siteLegal._actionby) as _actionby`)
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
    if(status !== 1)
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
    'siteLegal.created_at', 'siteLegal.updated_at', 'siteLegal.status',
    'siteLegal.legalAssessPercent', 'siteLegal.actionRemarks',
    'siteLegal._actionby', 'siteLegal.action_date',

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = site._createdby) as _createdby`),

    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
        from USERS_TBL subemp
          where subemp.userId = siteLegal._legalAssessBy) as _legalAssessBy`),
    
    this._knex.raw(`(select CONCAT(subemp.firstName," ", subemp.lastName)
    from USERS_TBL subemp
      where subemp.userId = siteLegal._actionby) as _actionby`)
    )
      .from({site: this._table})
      .innerJoin({siteLegal: 'SITE_LEGAL_ASSESS'}, 'site.location', '=', 'siteLegal._location')
      .whereBetween(`site.created_at`, [from, to])
      .andWhere('siteLegal.status', status);

    if(status == 1)
    return await query.andWhere('siteLegal.legalAssessPercent', '100')
                       .andWhere('siteLegal.status', status);

    // approved
    if(status !== 1)
    return await query.andWhere('siteLegal.status', status);
  }

}
module.exports = new MapServices; 