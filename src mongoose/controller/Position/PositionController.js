const PositionSchema = require('../../../schema/PositionSchema');
// Site Lists
const getPos = async (req, res) => {
  const result = await PositionSchema.find({});
  res.status(200).json(result);
}

// add site
const addPos = async (req, res) =>{
  const body = req.body;
  const result = await PositionSchema.create(body);
  res.status(200).json(result);
}

// udpate site
const updatePos = async (req, res) =>{
  const id = req.params.id || '';
  const result = await PositionSchema.findByIdAndUpdate(id, req.body)
  res.status(200).json(result)
}

// remove site
const removePos = async (req, res) => {
  const id = req.params.id || '';
  const result = await PositionSchema.findByIdAndDelete(id);
  res.status(200).json(result);

}

// update user
module.exports = {
  getPos,
  addPos,
  updatePos,
  removePos
}
