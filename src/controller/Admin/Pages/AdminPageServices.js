const BaseRepository = require("../../../services/BaseRepository");
const APP = '[AdminPageServices]';
class AdminPageServices extends BaseRepository{
  constructor(){
    super('USERS_TBL');
  }

  // page user access lists
  async pageUserList(){
    console.log(APP, '[pageUserList]');
    
    let userPages = await this._knex(this._table)
              .leftJoin('USERPAGE_TBL', 'USERPAGE_TBL.userId', '=', `${this._table}.userId`)
              .select(
                `${this._table}.userId`,
                `${this._table}.firstName`,
                `${this._table}.lastName`,
                `${this._table}.email`,
                `USERPAGE_TBL.pages`,
              )
              .where(`${this._table}.role`, 'standard')
              .andWhere(`${this._table}.status`, 1);

    const pages = await this._knex('PAGES_TBL').select().where('status', 1);
    
    userPages = userPages.reduce((acc, curr) => {
      
      // loop through pages
      let defaults = {};
      const userRoles = JSON.parse(curr.pages) || {};
      for (const iterator of pages) {
        // use pageid as key 
        defaults['pages'] = {
           ...defaults['pages'],
          // 'id': iterator['id'],
          [iterator['id']]: curr.pages && userRoles[iterator['id']] ? userRoles[iterator['id']] : false,
          ['title'+iterator['id']]: iterator.title
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

    // console.log(userPages);
    return userPages;
  }

  // get user page access
  async getPageUser(userId){
    console.log(APP, '[getPageUser]');
    
    let list = await this._knex('USERPAGE_TBL')
              .select('pages')
              .where('userId', userId)
              .first();
              
    // console.log(list);
    if(!list)
    return {};

    const pageList = await this._knex('PAGES_TBL').select().where('status', 1);
    let activePage = await JSON.parse(list.pages);
    // console.log(pageList);
    /**
     *  START BUILDING PAGES FOR USER
     */
    const userPages = {};
    for (const page of pageList) {
      if(activePage[page.id]) {
          /**
           * AUDIT
           *  [1, 2] SAQ
           * 1 SAQ SITES
           * 2 SAQ FILES
           */
          // console.log([1, 2].includes(page.id),' ---- ',activePage[page.id], page.id)
          // MAIN AUDIT
          if([3, 4].includes(page.id)) {
            if(!userPages.hasOwnProperty('audit'))
            userPages['audit'] = {MAINAUDIT: [], SAQ: []};

            userPages['audit']['MAINAUDIT'].push({
              title: page.title, navlink: page.navlink
            });
          }

          // SAQ AUDIT
          if([1, 2].includes(page.id)) {
            if(!userPages.hasOwnProperty('audit'))
            userPages['audit'] = {MAINAUDIT: [], SAQ: []};
            
            userPages['audit']['SAQ'].push({
              title: page.title, navlink: page.navlink
            });
          }


          // OPERATION
          if([5, 6, 7].includes(page.id)) {
            if(!userPages.hasOwnProperty('operation'))
            userPages['operation'] = {OPERATION: []};
            
            userPages['operation']['OPERATION'].push({
              title: page.title, navlink: page.navlink
            });
          }

          // LEGAL
          if([8, 9].includes(page.id)) {
            if(!userPages.hasOwnProperty('legal'))
            userPages['legal'] = {LEGAL: []};
            
            userPages['legal']['LEGAL'].push({
              title: page.title, navlink: page.navlink
            });
          }

          // GM

      }
    }
    // console.log(activePage);
    // console.log(userPages);
    return userPages;
  }


  // update user page access role
  async pageUserUpdateRole(body, userId){
    console.log(APP, '[pageUserUpdateRole]');

    body = JSON.stringify(body);
    return await this._knex
      .raw(`INSERT INTO USERPAGE_TBL (userId, pages) values (?, ?) 
      ON DUPLICATE KEY 
        UPDATE pages= ?`, 
      [userId, body, body]);
  }
}

module.exports = new AdminPageServices;