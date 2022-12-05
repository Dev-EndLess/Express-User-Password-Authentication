const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt')
const { response } = require('express')

handleLogin = async (req, res) => {
  const { user, pswd} = req.body
  if (!user || !pswd) return res.status(400).json({ 'message': 'Username and password are require'})
  //
  const foundUser = userDB.users.find(person => person.username === user)
  if (!foundUser) return res.sendStatus(401) // Not Authorized

  // control if password match
  const matchPswd = await bcrypt.compare(pswd, foundUser.password)
  if (matchPswd) {
    res.json({ 'success': `User ${user} is logged in!`})
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }