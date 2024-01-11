const User = require('../models/userModel');

const addData = async (req, res) => {
  try {
    const user = new User(req.body.data);
    await user.save();
    res.send({ status: 201, msg: 'Data added successfully' })
  } catch (err) {
    console.log(err);
    res.send({ status: 500, msg: 'Data failed' })
  }
};

const getData = async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: 201, data })
  } catch (err) {
    res.send({ status: 500, msg: ' failed' })
  }
};
module.exports = { addData, getData }