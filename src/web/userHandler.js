const users = require('../db/user');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

async function registerUser(req, res)
{
    const user = await users.registerFunction(req.body);
    res.send(user);
}

async function loginUser(req, res)
{
    const { email, password } = req.body;    
    const sessionToken = Buffer.from(`${email}:${password}`).toString('base64');
    res.cookie('session', sessionToken, { maxAge:900000, httpOnly: true }).end();

    // header-ben küldünk egy cookiet: Set-Cookie: key:value formában --> key a 'session', a sessionToken pedig a value
}

/*
async function loginJWT(req, res)
{
    const { email, password } = req.body; // password-re nincs szükség, elég az email + hash
    const token = jwt.verify({ email }, jwtSecret);

    res.send(token);

    //  const data = jwt.verify({ email }, jwtSecret);
    //  req.user = data;         --> eltárolom az adatokat (email mellett tetszőleges adatot is akár), és felpakolom egy user objektumba, így
}                                // használható middleWare, vagy 
*/

module.exports = {
    registerUser,
    loginUser,
  };


