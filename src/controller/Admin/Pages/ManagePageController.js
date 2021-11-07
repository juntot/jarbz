const AdminPageServices = require("./AdminPageServices");

// user list page access
const pageUserList = async (req, res) => {
  const list = await AdminPageServices.pageUserList();
  res.status(200).json(list);
}


// get user page access
const pageUser = async (req, res) => {
  const userId = req.params.id || '';
  // console.log(req.params);
  res.status(200).json(await AdminPageServices.getPageUser(userId));
}


// update user page access
const pageUserUpdateRole = async (req, res) => {
  const body = req.body || {};
  const userId = req.params.id || '';
  console.log(body);
  await AdminPageServices.pageUserUpdateRole(body, userId);
  res.status(200).json('success');
}

module.exports = {
  pageUser,
  pageUserList,
  pageUserUpdateRole
}