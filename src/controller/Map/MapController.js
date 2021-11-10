// const MailService = require('../../services/MailService');
// const MapSchema = require('../../../schema/MapSchema')

const MapServices = require("./MapServices");

// Site Lists
const siteList = async (req, res) => {
  const result = await MapServices.getAllBySpecificKey('status', 1)
  res.status(200).json(result);
}

// add site
const addSite = async (req, res) =>{
  const body = req.body;
  const result = await MapServices.insert(body);
  res.status(200).json(result);
}

// udpate site
const updateSite = async (req, res) =>{
  const id = req.params.id || '';
  await MapServices.updateBySpecificKey('location', id, req.body);
  res.status(200).json('success');
}

// remove site
const removeSite = async (req, res) => {
  const id = req.params.id || '';
  await MapServices.deleteRecord('location', id);
  res.status(200).json('success');

}

// my sites
const mySite = async (req, res) => {
  // get user id
  const id = req.params.id || '';
  
  const result = await MapServices.find({});
  // res.status(200).json(result);
}

// uploading sites
const uploadSite = async (req, res) =>  {
  // console.log(req.body);
  const result = await MapServices.insertMany(req.body);
  res.status(200).json(result);
}


// site evalution summary
const siteSummary = async (req, res) => {
  const from = req.params.from || moment(new Date()).format('YYYY-MM-DD 00:00:00');
  const end = req.params.end || moment(new Date()).format('YYYY-MM-DD 23:59:59');
    
  const result = await MapServices.siteSummary(from, end);
  res.status(200).json(result);
}
// update user
module.exports = {
  siteList,
  mySite,
  updateSite,
  removeSite,
  addSite,
  uploadSite,
  siteSummary
}
