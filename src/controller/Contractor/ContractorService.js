const BaseRepository = require('../../services/BaseRepository')
const FTP = require('../../services/FTP');

const APP = '[ContractorService]'
class ContractorService extends BaseRepository{
  constructor(){
    super('PARTNER_TBL');
  }

  
  // get contractors for evaultion
  async getContractorEval(from, to){
    console.log(APP, '[getContractorEval]');

    // const result = await this._knex(this._table)
    //   .innerJoin('USERS_TBL', 'USERS_TBL.userId', `${this._table}._userId`)
    //   .whereBetween(`${this._table}.created_at`, [from, to])
    //   .andWhere('status', 1)
    //  // .select();
    
    const result = await this._knex.select('partner.*', 'user.*')
    .from({partner: this._table})
    .innerJoin({user: 'USERS_TBL'}, 'partner._userId', '=', 'user.userId')
    .whereBetween('partner.created_at', [from, to])
    .andWhere('partner.status', 1);

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
    
    
    try {
      
      // upload file to ftp
      const imageUrl = await FTP.uploadJSFTP(file, userId);
      
      // get the existing records
      let userDocs = await this._knex(this._table).select('documents').where({_userId: userId}).first();

      // insert or update the existing records
      const docsData = {
        _userId: userId,
        documents: JSON.stringify({
          ...JSON.parse((userDocs.documents) || '{}'),
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
    // console.log(body, userId);
    // console.log(this._knex(this._table).insert('body').toString()+' ON DUPLICATE KEY ');
    // console.log(this._knex(this._table).update('body').toString().replace(/^update(.*?)set\s/gi, ''))


    body['_userId'] = userId;
    body['team'] = JSON.stringify(body.team || []);
    body['documents'] = JSON.stringify(body.documents || {});
    // try {
    //   return this._knex.transaction(async trx=>{
    //     const insert = await trx(this._table).insert(body).toString();
    //     const update = await trx(this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');
    //     return await trx.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`)
    //     .transacting(trx)
    //     // .then();
    //   })
    // } catch (error) {
    //   throw error;
    // }
    
    const insert = await this._knex(this._table).insert(body).toString();
    const update = await this._knex(this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');
    return await this._knex.raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);
  }
}

module.exports = new ContractorService;