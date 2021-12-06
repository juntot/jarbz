const APP = '[UserService]';
const BaseRepository = require('../../services/BaseRepository');
const MailService = require('../../services/MailService');
const FTP = require('../../services/FTP');

/**
 * A class for Products
 * @class
 */
class UserService extends BaseRepository{
  /**
   * @param {Services} Logger
   * @param {Services} ProductRepository
   */

  constructor() {
    super('USERS_TBL');
    // this._logger = Logger;
    // this._getAllProducts = GetAllProducts;
  }

  
  /**
   * Insert User
   * @param {array} body
   */
  async register(body){
    body['password'] = Math.random().toString(36).substr(2, 8);
    const userId = `U${new Date().valueOf()}`;

    let user =  {...body, userId: userId};
    try {
        await FTP.makeDIRJSFTP(userId);
        await this.insert(user);
        let mail = await MailService.send({
            from: 'info@4th-jarb.com', 
            to: body.email, 
            message: 
            `<pre>
            Hi ${body.firstName || ''},

                Thank you for taking time to register. We're exited to work with you.
            Here's your password: ${body.password}
            
            For any concerns or clarrification, 
            Please don't hesitate to contact our team.

            contact# (032) 401-4904

        
            Regards,
            4th-jarb Team
            </pre>`
        });
        console.log(mail);
        return user;
    } catch (error) {
        throw error;
    }
  }
  


 /**
   * UPDATE USER
   * Find
   * @param {array} body
   */

  async updateUser(knownKey, knownValue, value, file){
    console.log(APP, '[updateUser]');
    try {
      // upload file to ftp
      
      if(file){
        const imageUrl = await FTP.uploadJSFTP(file, userId);
        value['avatar'] = imageUrl
      }
      
      return await this.updateBySpecificKey(knownKey,knownValue, value);  

    } catch (error) {
      throw error;
    }
    
  }


  /**
   * FORGET PASSWORD
   * Find
   * @param {array} body
   */
   async forgetPass(email) {
    console.log(APP, '[forgetPass]');
    console.log(email)
    const user = await this.getBySpecificKey('email', email);
    
    try {
        await MailService.send({
          from: 'info@4th-jarb.com',
          to: email,
          message: 
          `
          Hi, ${user.firstName}, <br>
              Here's your password: ${user.password}
          
          For any concerns or clarrification, 
          Please don't hesitate to contact our team. <br><br>

          contact# (032) 401-4904

          <br><br>
          Regards,<br>
          4th-jarb Team
          </pre>`
        })
        return 'success';
    } catch (error) {
      
    }
   }

  /**
   * Insert or update user info
   * partner
   */

  async insertOrUpdate(body){
    console.log(APP, '[insertOrUpdate]');
    const insert = await this._knex(this._table).insert(body).toString();
    const update = await this._knex(this._table).update(body).toString().replace(/^update(.*?)set\s/gi, '');

  }

}

module.exports = new UserService;
