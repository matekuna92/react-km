// req.query helyett az authorization beépített header-ben várjuk az adatokat

const users = require('../../db/user');

async function authBasic(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ message: 'Unauthorized, no data' });
  }

  // base64 -ben enkódolt adatból csinálunk utf-8-asat, a ":" mentén szétválasztva pedig kapunk egy username:password alakú kifejezést
  const [email, password] = Buffer.from(auth, 'base64').toString('utf-8').split(':');       // tömb destruktúrálás

  const user = await users.findByEmail(email);

  if (!user) {
    return res.status(401).send({ message: 'Unauthorized, invalid email' });
  }

  if (password !== user.password) {
    return res.status(401).send({ message: 'Unauthorized, invalid password' });
  }

  return next();
}

module.exports = authBasic;