//const jwt = require('jsonwebtoken');
const users = require('../db/user');
//const { jwtSecret } = require('../config');

async function registerUser(req, res)
{
    const user = await users.registerFunction(req.body);
    res.send(user);
}

async function loginUser(req, res)
{
    const { email, password } = req.body;
 //   const token = jtw.sign({ email }, jwtSecret);
    
//    res.send(token);
}

module.exports = {
    registerUser,
    loginUser,
  };


