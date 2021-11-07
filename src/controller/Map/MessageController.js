const MessageSchema = require("../../../schema/MessageSchema");

// my message lists
const messageList = async (req, res) => {
  const id = req.params.id || '';
  let page = req.query.page || 1
  const limit = req.query.limit || 5;
  // const end = req.query.end || moment().format('YYYY-MM-DD');

  const totalRecords = await MessageSchema.count({to: id});
  const totalpages = Math.ceil(totalRecords/limit);

  // prev
  if(page > 1)
    page --;

  // next
  if(totalpages > page)
    totalpages ++;


  const result = await MessageSchema.find({ to: id },
    {
      skip: page,
      limit: limit,
    }).sort({dateCreated: -1});

  
  res.status(200).json(result);
}


// create message
const addMessage = async (req, res) => {
  const body = req.body;
  const result = await MessageSchema.create(body);
  res.status(200).json(result);
}

// delete messages
const removeMessages = async (req, res) => {
   const result = await MessageSchema.deleteMany({_id: req.body });
   res.status(200).json(result);
}

module.exports = {
  messageList,
  addMessage,
  removeMessages,
}