const BaseRepository = require("../../../services/BaseRepository");

class AdminPageServices extends BaseRepository{
  constructor(){
    super('USERS_TBL');
  }

  // page user access lists
  async pageUserList(){

    let list = await this._knex(this._table)
              .leftJoin('USERPAGE_TBL', 'USERPAGE_TBL.userId', '=', `${this._table}.userId`)
              .select(
                `${this._table}.userId`,
                `${this._table}.firstName`,
                `${this._table}.lastName`,
                `${this._table}.email`,
                `USERPAGE_TBL.pages`,
              );

    const pages = await this._knex('PAGES_TBL').select();

    list = list.reduce((acc, curr) => {
      // loop through pages
      let defaults = {};
      const userRoles = JSON.parse(curr.pages || {});
      for (const iterator of pages) {
        // use pageid as key 
        defaults['pageid_'+iterator['id']] = {
          'id': iterator['id'],
          [iterator['id']]: curr.pages && userRoles[iterator['id']] ? userRoles[iterator['id']] : false,
          'title': iterator.title
          }
      }
      
      defaults = {
        ...defaults,
        ...curr.page
      }

      // asign defaults
      acc.push({
        userId:    curr.userId,     email: curr.email,
        firstName: curr.firstName,  lastName: curr.lastName,
        ...defaults,
      });

      return acc;
    }, []);

    console.log(list);
    return list;
  }

  // update user page access role
  async pageUserUpdateRole(body, userId){
    body = JSON.stringify(body);
    // await this._knex
      // .raw(`INSERT INTO USERPAGE_TBL (userId, pages) values (?, ?)`, 
      // [userId, body]);
    return await this._knex
      .raw(`INSERT INTO USERPAGE_TBL (userId, pages) values (?, ?) 
      ON DUPLICATE KEY 
        UPDATE pages= ?`, 
      [userId, body, body]);
  }
}

module.exports = new AdminPageServices;