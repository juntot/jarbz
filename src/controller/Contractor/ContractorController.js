const moment = require('moment');
// const ContractorDocSchema = require('../../../schema/ContractorDocSchema');
// const GC = require('../../services/Bucket');
const ContractorService = require('./ContractorService');

// get contractor List
const getContractorList = async (req, res) =>{
  try {
    
    const result = await ContractorService.contractorList();
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'failed to evaluate please try again'});
  }

} 
// get contractor for evaluation
const getContractorEval = async (req, res) =>{
    const from = req.params.from || moment(from).format('YYYY-MM-DD 00:00:00');
    const end = req.params.end || moment(from).format('YYYY-MM-DD 23:59:59');
    const result = await ContractorService.getContractorEval(
        new Date(from),
        new Date(end) // +1 day
    );
    res.status(200).json(result);
}

// get contractor
const getContractorDetails = async (req, res) => {
  const id = req.params.id;
  const email = req.body.email;
  const result = await ContractorService.getContractorDetails(id, email);
  res.status(200).json(result);
}

// update user
const updateContractor = async (req, res) => {
  
  const id = req.params.id || '';
  const body = req.body;
  delete body.documents;
  await ContractorService.insertOrUpdate(body, id)
  res.status(200).json('success');

}

// attachdocuments
const addDocuments = async (req, res) => {
  // const id = req.params.id;
  const body = {
    _userId: req.params.id,
    name: req.body.name,
    email: req.body.email
  }  
  try {
      const file = req.file

      // const imageUrl = await GC.uploadFile(file)
      // udpate user schema documents
      // await ContractorDocSchema.findOneAndUpdate({_iduser: id},{
      //         ['documents.'+req.body.name] : imageUrl
      // }, {upsert: true});

      // const imageUrl = await FTP.uploadJSFTP(file, id);
      const result = await ContractorService.insertOrUpdateDocs(body, file)
      // console.log(imageUrl);
      res.status(200).json(result)
    } catch (error) {
      throw error;
    }
}

// EVALUATOR ACCESS =======================================
// evaluate contractor
const evaluateContractor = async (req, res) => {
  try {
    const result = await ContractorService.evaluateContractor(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'failed to evaluate please try again'});
  }
}

module.exports = {
  getContractorEval,
  updateContractor,
  addDocuments,
  getContractorDetails,
  evaluateContractor,
  getContractorList
}