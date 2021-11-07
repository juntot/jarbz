const { model, Mongoose } = require("mongoose");
const PageSchema = require("../../../schema/PageSchema");
const UserAccessSchema = require("../../../schema/UserAccessSchema");
const UserSchema = require("../../../schema/UserSchema");

// user list pages
const pageUserList = async (req, res) => {

  const list = await UserSchema.aggregate([
    { $lookup: {
      'from': UserAccessSchema.collection.name,
      'localField': '_id',
      'foreignField': '_iduser',
      'as': 'pageauth'
    }}
  ]);
  res.status(200).json(list);
}

// list of pages
const pageList = async (req, res) => {
  const list = await PageSchema.find({});
  res.status(200).json(list);
}

module.exports = {
  pageList,
  pageUserList
}