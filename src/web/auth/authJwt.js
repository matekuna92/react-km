const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

async function jwtAuth(req, res, next) 
{
    const auth = req.headers.authorization;
  
    if (!auth) {
      return res.status(401).send({ message: 'Unauthorized, no data' });
    }
    
    // 'Bearer longTokenString formátumú kifejezést várunk
    const [scheme, token] = auth.split(' ');
  
    if (scheme !== 'Bearer') {
      return res.status(401).send({ message: 'Unauthorized, invalid scheme'});
    }

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized, invalid token'});
    }

/*    if (scheme !== 'Bearer' || !token) {
      return res.status(401).send({ message: 'Unauthorized, invalid token' });
    } */
  
    try {
      // HAZI 1: szedjetek le a usert a db-bol es azt tegyetek fel a req.user-re
      // a token belseje helyett

      // verify: összehash-eljük a token első 2 részét, összehasonlítjuk a 3. résszel, ha nem egyezik az eredmény a token 3. részével, akkor módosítani próbálták a tokent
      const data = jwt.verify(token, jwtSecret);
      
    } catch (err) {
      return res.status(401).send({ message: 'Unauthorized, invalid token' });
    }
  
    return next();
  }
  
  module.exports = jwtAuth;
  