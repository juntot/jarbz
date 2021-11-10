const BaseRepository = require("../../services/BaseRepository");
const APP = '[MapServices]';
class MapServices extends BaseRepository{
  constructor(){
    super('MAP_TBL');
  }
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
  async siteSummary(from, to) {
    console.log(APP, '[siteSummary]');

    return await this._knex(this._table)
      .whereBetween(`${this._table}.created_at`, [from, to])
      .andWhere('docstat', 0)
      .select();
  }

}
module.exports = new MapServices;