const BaseRepository = require('../../services/BaseRepository')
const FTP = require('../../services/FTP');

const APP = '[ContractorService]'
class ContractorService extends BaseRepository{
  constructor(){
    super('PARTNER_TBL');
  }

  // get contractor details
  async getContractorDetails(id, email){
    console.log(APP, '[getContractorDetails]');
    let result;
    try {
      // result = await this._knex(this._table)
      //     .where({'_userId': id})
      //     .orWhere({'_email': email})
      //     .select()
      //     .first();
      result = await this._knex.select('partner.*', 
              'user.firstName', 'user.lastName',
              'user.middleName', 'user.address',
              'user.contactNum', 'user.email')
              .from({partner: this._table})
              .innerJoin({user: 'USERS_TBL'}, 'partner._email', '=', 'user.email')
              .where({'partner._userId': id})
              .orWhere({'partner._email': email})
              .select()
              .first();
    } catch (SQLError) {
      throw new Error(SQLError);
    }
    return result;
  }

  // get contractors for evaultion
  async getContractorEval(from, to){
    console.log(APP, '[getContractorEval]');
    
    const result = await this._knex.select('partner.*', 
    'user.firstName', 'user.lastName',
    'user.middleName', 'user.address',
    'user.contactNum', 'user.email')
    .from({partner: this._table})
    .innerJoin({user: 'USERS_TBL'}, 'partner._userId', '=', 'user.userId')
    .whereNot({ 'partner.isUpdatedTeam': -1 })
    // .whereBetween('partner.created_at', [from, to])
    // .andWhereNot({ 'partner.isUpdatedTeam': -1 })
    // .andWhere('partner.status', 1);

    return result.map(res=>{
      res['team'] = JSON.parse(res.team);
      res['documents'] = JSON.parse(res.documents);
      return res;
    })
                          
  }

  
  // insert or update contractor Docs
  async insertOrUpdateDocs(body, file) {
    console.log(APP, '[insertOrUpdateDocs]');
    const userId = body._userId;
    const email =  body.email;
    
    try {  
      // upload file to ftp
      const imageUrl = await FTP.uploadJSFTP(file, userId);
      
      // get the existing records
      let userDocs = await this._knex(this._table).select('documents')
                    .where({_userId: userId})
                    .orWhere({_email: email})
                    .first();
      
      // insert or update the existing records
      const docsData = {
        _userId: userId,
        _email: email,
        documents: JSON.stringify({
          ...JSON.parse(userDocs? userDocs.documents : '{}'),
          [body.name]: imageUrl
        })
      }
      
      const insert = await this._knex(this._table).insert(docsData).toString();
      const update = await this._knex(this._table).update(docsData).toString().replace(/^update(.*?)set\s/gi, '');
      await this._knex.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);
      // console.log(imageUrl);
      return {
            message: "Upload was successful",
            data: imageUrl,
      };
    } catch (error) {
      throw error;
    }
  }


  // insert or update contractor record
  async insertOrUpdate(body, userId){
    console.log(APP, '[insertOrUpdate]');

    body['_userId'] = userId;
    body['team'] = JSON.stringify(body.team || []);
    
    
    const insert = await this._knex(this._table).insert(body).toString();
    const update = await this._knex(this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');
    
    return await this._knex.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);
  }

  /**
   *  Get all Contractors
   *  contractr list
   */
  async contractorList(){
    console.log(APP, '[contractorList');
    const result = await this._knex.select('partner.*', 
      'user.firstName', 'user.lastName',
      'user.middleName', 'user.address',
      'user.contactNum', 'user.email')
      .from({partner: this._table})
      .innerJoin({user: 'USERS_TBL'}, 'partner._userId', '=', 'user.userId');
    return result;
  }

  // EVALUATOR ACCESS
  // evaluate contractor
  async evaluateContractor(body) {
    console.log(APP, '[evaluateContractor]');
    // please check getContractorEval exclude user fields
    delete body.userId;
    delete body.firstName;
    delete body.lastName;
    delete body.middleName;
    delete body.address;
    delete body.contactNum;
    delete body.email;
    delete body.created_at;
    delete body.updated_at;
    
    body['documents'] = JSON.stringify(body.documents);
    body['team'] = JSON.stringify(body.team);
    return await this.updateBySpecificKey('_email', body._email, body);
  }
}

module.exports = new ContractorService;