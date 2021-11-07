const moment = require('moment');
const ContractorDocSchema = require('../../../schema/ContractorDocSchema');
const GC = require('../../services/Bucket');
const ContractorService = require('./ContractorService');

// get contractor for evaluation
const getContractorEval = async (req, res) =>{
    const from = req.params.from || moment(from).format('YYYY-MM-DD 00:00:00');
    const end = req.params.end || moment(from).format('YYYY-MM-DD 23:59:59');
    const result = await ContractorDocSchema.find({
      dateCreated: {
        $gte: new Date(from),
        $lt: new Date(end) // +1 day
       }
    });
    res.status(200).json(result);
}

// get contractor
const getContractorDetails = async (req, res) => {
  const id = req.params.id || '';
  const result = await ContractorService.getBySpecificKey('userId_', id);
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
  const id = req.params.id;
  
  try {
      const file = req.file
      // const imageUrl = await GC.uploadFile(file)
      
      const imageUrl = 'await GC.uploadFile(file)';
      // udpate user schema documents
      // await ContractorDocSchema.findOneAndUpdate({_iduser: id},{
      //         ['documents.'+req.body.name] : imageUrl
      // }, {upsert: true});

      console.log(file);
      res.status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
      throw error;
    }
}

module.exports = {
  getContractorEval,
  updateContractor,
  addDocuments,
  getContractorDetails
}