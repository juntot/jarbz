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

}
module.exports = new MapServices;