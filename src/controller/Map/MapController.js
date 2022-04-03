// const MailService = require('../../services/MailService');
// const MapSchema = require('../../../schema/MapSchema')

const MapServices = require("./MapServices");

// Site Lists
const siteList = async (req, res) => {
  const status = req.params.status || 'all';
  const result = await MapServices.siteList('status', status)
  res.status(200).json(result);
}

// add site
const addSite = async (req, res) =>{
  const body = req.body;
  try {
    const result = await MapServices.insert(body);  
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
  
}

// update site
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
  const status = req.body.status || 1;

  const result = await MapServices.siteSummary(from, end, status);
  res.status(200).json(result);
}

// OPERATION TEAM =============================================================
// site technical evaluation
const siteTechEval = async (req, res) => {
    const from = req.params.from || moment(new Date()).format('YYYY-MM-DD 00:00:00');
    const end = req.params.end || moment(new Date()).format('YYYY-MM-DD 23:59:59');
    const status = req.body.status || 2;

    const result = await MapServices.siteTechEvaluation(from, end, status);
    res.status(200).json(result);
}

// site technical evaluation udpate or insert
const siteUpdatetechicalEval = async(req, res) => {
  const body = req.body || '';
  const location = req.params.location || '';
  body['_location'] = location;
  const result = await MapServices.siteUpdatetechicalEval(body)
  res.status(200).json(result)
}


// site tech evaluation summary
const siteTechEvalSummary = async (req, res) => {
  const from = req.params.from || moment(new Date()).format('YYYY-MM-DD 00:00:00');
  const end = req.params.end || moment(new Date()).format('YYYY-MM-DD 23:59:59');
  const status = req.body.status || 1;

  const result = await MapServices.siteTechEvalSummary(from, end, status);
  res.status(200).json(result)
}

// LEGAL TEAM =============================================================
// site legal evaluation
const siteLegalAssess = async (req, res) => {
  const from = req.params.from || moment(new Date()).format('YYYY-MM-DD 00:00:00');
  const end = req.params.end || moment(new Date()).format('YYYY-MM-DD 23:59:59');
  const status = req.body.status || 2;

  const result = await MapServices.siteLegalAssess(from, end, status);
  res.status(200).json(result);
}

// site legal evaluation udpate or insert
const siteUpdateLegalAssess = async(req, res) => {
const body = req.body || '';
const location = req.params.location || '';
body['_location'] = location;
const result = await MapServices.siteUpdateLegalAssess(body)
res.status(200).json(result)
}


// site legal evaluation summary
const siteLegalAssessSummary = async (req, res) => {
const from = req.params.from || moment(new Date()).format('YYYY-MM-DD 00:00:00');
const end = req.params.end || moment(new Date()).format('YYYY-MM-DD 23:59:59');
const status = req.body.status || 1;

const result = await MapServices.siteLegalAssessSummary(from, end, status);
res.status(200).json(result)
}


// site count per status
const siteCount = async (req, res) => {
  const result = await MapServices.siteCountStatus();
  res.status(200).json(result);
}


// General Manager =============================================================
// get approved sites
const approvedSites = async (req, res) => {
  try {
    const result = await MapServices.approvedSites();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error occured'})
  }   
}

// asign team partner for site
const assignTeamPartner = async (req, res) => {
  const body = req.body;
  try {
    const result = await MapServices.assignTeamPartner(body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'error occured'})
  }   
}
// update user
module.exports = {
  siteList,
  mySite,
  updateSite,
  removeSite,
  addSite,
  uploadSite,
  siteSummary,
  siteTechEval,
  siteUpdatetechicalEval,
  siteTechEvalSummary,
  siteLegalAssess,
  siteUpdateLegalAssess,
  siteLegalAssessSummary,
  siteCount,
  approvedSites,
  assignTeamPartner,
}
