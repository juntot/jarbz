const PageSchema = require('../schema/PageSchema');

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

// Every String can be casted in ObjectId now
// console.log('545f489dea12346454ae793b'.toObjectId());

class UserAccessClass{

  // create/ update authorize users per pages
  static async modifyAccess({_iduser, _idpage, value}) {
    let result; 

    const pageUser = await this.find({_iduser: _iduser});
    if(pageUser.length){
        // check if user and page id exists
        const pageRole = await this.find({_iduser: _iduser, 'pages._idpage':  _idpage});
        if(pageRole.length){
          result = await this.findOneAndUpdate(
            {'_iduser':_iduser, 'pages._idpage': _idpage}, 
            {'pages.$': {_idpage, value}}
            );
        } else{
          // append to new array
          result = await this.findOneAndUpdate(
            {'_iduser':_iduser}, 
            {$push: {pages: {_idpage, value}}}
            );
        }
      
    }
    else{
      result = await this.create({'_iduser':_iduser, pages: [{_idpage, value}]})    
    }
   return result;  
  }

  // get all active page per user
  static async getActivePages(_iduser){
      let active = await this.find({_iduser: _iduser, 'pages.value': true}).select('pages');
      const pageIds = [];
      if(active.length){
        
        for (const iterator of active[0].pages) {
          if(iterator.value == true)
          pageIds.push((iterator._idpage));
        }
        // array of ids
        active = await PageSchema.find({
          '_id': { $in: pageIds}
          });
        
      }
      // console.log(active);
      return active;
      
  }
}
module.exports = UserAccessClass;