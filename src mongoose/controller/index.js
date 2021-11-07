const {
  login, 
  register, 
  test,
  userList,
  updateUser,
  userInfo,
} = require('./User/UserController');

const {
  pageUser, 
  pageUserRole
} = require('./Admin/PageUserController');

const {
  pageList, pageUserList
} = require('./Admin/ManagePageController');

const { 
  getContractorEval,
  updateContractor,
  addDocuments
} = require('./Contractor/ContractorController');
const { siteList, mySite, addSite, updateSite, removeSite, uploadSite } = require('./Global/MapController');
const { addMessage, messageList, removeMessages } = require('./Global/MessageController');
const { addPos, updatePos, removePos, getPos } = require('./Position/PositionController');
const { updateDept, removeDept, getDept, addDept } = require('./Department/DepartmentController');
const { addBranch, updateBranch, removeBranch, getBranch } = require('./Branch/BranchController');


module.exports = {
  /*
  * Users
  */

  // constructions
  '/api/contractor-evalation/:from/:end': getContractorEval,
  '/api/contractor/:id/update': updateContractor,
  '/api/contractor/:id/documents': addDocuments,

  // standard user
  '/api/test': test,
  '/api/login': login,
  '/api/register': register,
  '/api/user/:id/update': updateUser,
  '/api/user/search': userInfo,
  '/api/user': userList,
  
  /*
  * ADMIN
  */
  // position
  '/api/pos/create': addPos,
  '/api/pos/:id/update': updatePos,
  '/api/pos/:id/remove': removePos,
  '/api/pos': getPos,

  // department
  '/api/dept/create': addDept,
  '/api/dept/:id/update': updateDept,
  '/api/dept/:id/remove': removeDept,
  '/api/dept': getDept,

  // branch
  '/api/branch/create': addBranch,
  '/api/branch/:id/update': updateBranch,
  '/api/branch/:id/remove': removeBranch,
  '/api/branch': getBranch,

  // map
  '/api/site/upload': uploadSite,
  '/api/site/create': addSite,
  '/api/site/:id/update': updateSite,
  '/api/site/:id/remove': removeSite,
  '/api/site/:id' : mySite,
  '/api/site': siteList,

  // messages
  '/api/message/create': addMessage,
  '/api/message/remove': removeMessages,
  '/api/message/:id': messageList,
  
  // pages
  '/api/page/:id/user': pageUser,
  '/api/page/:id/user-role': pageUserRole,
  '/api/page/user': pageUserList,
  '/api/page': pageList,
  
  
}