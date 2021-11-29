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
   * User Access
   * @param {array} body
   */
  


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
}

module.exports = new UserService;
