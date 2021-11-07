const MailService = require('../../services/MailService');
const MapSchema = require('../../../schema/MapSchema')
// Site Lists
const siteList = async (req, res) => {
  const result = await MapSchema.find({});
  res.status(200).json(result);
}

// add site
const addSite = async (req, res) =>{
  const body = req.body;
  const result = await MapSchema.create(body);
  res.status(200).json(result);
}

// udpate site
const updateSite = async (req, res) =>{
  const id = req.params.id || '';
  const result = await MapSchema.findByIdAndUpdate(id, req.body)
  res.status(200).json(result)
}

// remove site
const removeSite = async (req, res) => {
  const id = req.params.id || '';
  const result = await MapSchema.findByIdAndDelete(id);
  res.status(200).json(result);

}

// my sites
const mySite = async (req, res) => {
  // get user id
  const id = req.params.id || '';
  
  const result = await MapSchema.find({});
  res.status(200).json(result);
}


const uploadSite = async (req, res) =>  {
  // console.log(req.body);
  const result = await MapSchema.insertMany(req.body);
  res.status(200).json(result);
}
// update user
module.exports = {
  siteList,
  mySite,
  updateSite,
  removeSite,
  addSite,
  uploadSite
}
