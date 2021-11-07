const BranchSchema = require('../../../schema/BranchSchema');
// Site Lists
const getBranch = async (req, res) => {
  
  const result = await BranchSchema.find({});
  res.status(200).json(result);
}

// add site
const addBranch = async (req, res) =>{
  const body = req.body;
  const result = await BranchSchema.create(body);
  res.status(200).json(result);
}

// udpate site
const updateBranch = async (req, res) =>{
  const id = req.params.id || '';
  const result = await BranchSchema.findByIdAndUpdate(id, req.body)
  res.status(200).json(result)
}

// remove site
const removeBranch = async (req, res) => {
  const id = req.params.id || '';
  const result = await BranchSchema.findByIdAndDelete(id);
  res.status(200).json(result);

}

// update user
module.exports = {
  getBranch,
  addBranch,
  updateBranch,
  removeBranch
}
