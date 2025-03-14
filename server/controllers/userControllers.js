const User = require('../models/User')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email') 
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

module.exports = { getAllUsers }
