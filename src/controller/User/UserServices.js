const TAG = '[UserService]';
const BaseRepository = require('../../services/BaseRepository');
const MailService = require('../../services/MailService');
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
   * FORGET PASSWORD
   * Find
   * @param {array} body
   */
   async forgetPass(email) {
    const user = await this.getAllBySpecificKey('email', email);
    try {
        await MailService.send({
          from: 'info@4th-jarb.com',
          to: email,
          message: 
          `<pre>
          Hi, ${user.firstName},
              Here's your password: ${user.password}
          
          For any concerns or clarrification, 
          Please don't hesitate to contact our team.

          contact# 09123456789

      
          Regards,
          4th-jarb Team
          </pre>`
        })
        return user;
    } catch (error) {
      
    }
   }
}

module.exports = new UserService;
