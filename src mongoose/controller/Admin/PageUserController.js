const UserAccessSchema = require("../../../schema/UserAccessSchema");

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};
// Every String can be casted in ObjectId now
// console.log('545f489dea12346454ae793b'.toObjectId());

const pageUser = async (req, res) => {
  const _iduser =  req.params.id || '';
  
  // const Aggreate = await UserAccessSchema.aggregate(
  // [{
  //   $lookup: { 
  //     from: 'Page', 
  //     localField: 'pages._idpage', 
  //     foreignField: '_id', 
  //     as: 'pages' 
  //   }
  // }]);
  
  // console.log(Aggreate);
  const activePages = await UserAccessSchema.getActivePages(_iduser);
  // console.log(activePages);/
  res.status(200).json(activePages);
} 

const pageUserRole = async (req, res) => {
  const {_idpage, value} = req.body;
  const _iduser =  req.params.id;
  
  // let result; 

  // const pageUser = await UserAccessSchema.find({_iduser: _iduser});
  // if(pageUser.length){
  //     // check if user and page id exists
  //     const pageRole = await UserAccessSchema.find({_iduser: _iduser, 'pages._idpage':  _idpage});
  //     if(pageRole.length){
  //       result = await UserAccessSchema.findOneAndUpdate(
  //         {'_iduser':_iduser, 'pages._idpage': _idpage}, 
  //         {'pages.$': {_idpage, value}}
  //         );
  //     } else{
  //       // append to new array
  //       result = await UserAccessSchema.findOneAndUpdate(
  //         {'_iduser':_iduser}, 
  //         {$push: {pages: {_idpage, value}}}
  //         );
  //     }
    
  // }
  // else{
  //   result = await UserAccessSchema.create({'_iduser':_iduser, pages: [{_idpage, value}]})    
  // }
  
  const result = await UserAccessSchema.modifyAccess({_idpage, _iduser, value});

  res.send(result);
}

module.exports = {
  pageUser,
  pageUserRole
}