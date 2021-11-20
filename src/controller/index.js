const {
  login, 
  register, 
  // test,
  userList,
  updateUser,
  // userInfo,
} = require('./User/UserController');


const {
  // pageList, 
  pageUserList, pageUserUpdateRole, pageUser
} = require('./Admin/Pages/ManagePageController');

const { 
  getContractorEval,
  updateContractor,
  addDocuments,
  getContractorDetails
} = require('./Contractor/ContractorController');
const { siteList, mySite, addSite, updateSite, removeSite, uploadSite, siteSummary, siteTechEval, siteUpdatetechicalEval, siteTechEvalSummary, siteUpdateLegalAssess, siteLegalAssess, siteLegalAssessSummary, siteCount } = require('./Map/MapController');
const { addMessage, messageList, removeMessages } = require('./Map/MessageController');
const { forgetPass } = require('./User/UserServices');



module.exports = {
  /*
  * Users
  */

  // constructions
  '/api/contractor-evalation/:from/:end': getContractorEval,
  '/api/contractor/:id/update': updateContractor,
  '/api/contractor/:id/documents': addDocuments,
  '/api/contractor/:id/details': getContractorDetails,

  // standard user
  // '/api/test': test,
  '/api/login': login,
  '/api/register': register,
  '/api/forgetpass': forgetPass,
  '/api/user/:id/update': updateUser,
  // '/api/user/search': userInfo,
  '/api/user': userList,
  
  /*
  * ADMIN
  */
  
  // map
  '/api/site/count': siteCount,
  '/api/site/upload': uploadSite,
  '/api/site/create': addSite,
  
  // operation team
  '/api/site/tech-eval/:location/update': siteUpdatetechicalEval,
  '/api/site/tech-eval/:from/:end': siteTechEval,
  '/api/site/tech-eval-summary/:from/:end': siteTechEvalSummary,
  
  //  legal team
  '/api/site/legal-assess/:location/update': siteUpdateLegalAssess,
  '/api/site/legal-assess/:from/:end': siteLegalAssess,
  '/api/site/legal-assess-summary/:from/:end': siteLegalAssessSummary,


  '/api/site/eval-summary/:from/:end' : siteSummary,

  '/api/site/:id/update': updateSite,
  '/api/site/:id/remove': removeSite,
  '/api/site/:status/stat': siteList,
  '/api/site/:id' : mySite,
  '/api/site': siteList,

  // messages
  '/api/message/create': addMessage,
  '/api/message/remove': removeMessages,
  '/api/message/:id': messageList,
  
  // pages
  // '/api/page/:id/user-role': pageUserRole,
  '/api/page/:id/user': pageUser,
  '/api/page/:id/update': pageUserUpdateRole,
  // '/api/page': pageList,
  '/api/page/users': pageUserList,
  
}