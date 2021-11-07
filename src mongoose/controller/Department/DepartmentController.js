const DepartmentSchema = require('../../../schema/DepartmentSchema');
// Site Lists
const getDept = async (req, res) => {
  const result = await DepartmentSchema.find({});
  res.status(200).json(result);
}

// add site
const addDept = async (req, res) =>{
  const body = req.body;
  const result = await DepartmentSchema.create(body);
  res.status(200).json(result);
}

// udpate site
const updateDept = async (req, res) =>{
  const id = req.params.id || '';
  const result = await DepartmentSchema.findByIdAndUpdate(id, req.body)
  res.status(200).json(result)
}

// remove site
const removeDept = async (req, res) => {
  const id = req.params.id || '';
  const result = await DepartmentSchema.findByIdAndDelete(id);
  res.status(200).json(result);

}

// update user
module.exports = {
  getDept,
  addDept,
  updateDept,
  removeDept
}
