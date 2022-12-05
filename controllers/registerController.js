const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { user, pswd } = req.body
  if (!user || !pswd) return res.status(404).json({ 'message': 'Username and password are required' })

  // check nfor duplicate usernames in the database               // submitted from the user
  const duplicate = usersDB.users.find(person => person.username === user)
  if (duplicate) return res.sendStatus(409) // Conflict Status
  try {
    // https://www.npmjs.com/package/bcrypt
    // encrypt the password with encrypt package
    const hashedPswd = await bcrypt.hash(pswd, 10)

    // Store the new user
    const newUser = { "username": user, "password": hashedPswd }
    usersDB.setUsers([...usersDB.users, newUser])

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    )
    console.log(usersDB.users)
    res.status(201).json({ 'success': `New user ${user} created!`})


  } catch (error) {
    res.status(500).json({ 'message': error.message })
  }
}

module.exports = { handleNewUser }