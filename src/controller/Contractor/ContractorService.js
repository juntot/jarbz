const BaseRepository = require('../../services/BaseRepository')
const APP = '[ContractorService]'
class ContractorService extends BaseRepository{
  constructor(){
    super('PARTNER_TBL');
  }

  


  // insert or update contractor record
  async insertOrUpdate(body, userId){
    console.log(APP, '[insertOrUpdate]');
    // console.log(body, userId);
    // console.log(this._knex(this._table).insert('body').toString()+' ON DUPLICATE KEY ');
    // console.log(this._knex(this._table).update('body').toString().replace(/^update(.*?)set\s/gi, ''))
    body['userId_'] = userId;
    body['team'] = JSON.stringify(body.team);
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
    
    // return true;
    
    const insert = await this._knex(this._table).insert(body).toString();
    const update = await this._knex(this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');
    return await this._knex
      .raw(`${insert} ON DUPLICATE KEY UPDATE ${update}`);

    // return await this._knex
    //   .raw(`INSERT INTO ${this._table} 
    //   (userId_, documents, team) 
    //   values (?, ?, ?) 
    //   ON DUPLICATE KEY 
    //     UPDATE documents= ?, 
    //     team = ?
    //   `, 
    //   [userId, body, body, body, body]);
  }
}

module.exports = new ContractorService;