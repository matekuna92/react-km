const { Router } = require('express');
const { get, list, insert, update, remove } = require('./deviceHandler');
const { registerUser, loginUser } = require('./userHandler');

//const auth = require('./auth/authSimple');
const auth = require('./auth/authBasic');

// public és private router szétválasztása
const publicRouter = Router();
const privateRouter = Router();

privateRouter.use(auth);

publicRouter.get('/', (req,res) => {
    res.send('Server is working');
})

// device routers - deviceHandler-ben definiáljuk a function-öket 

privateRouter.get('/devices', list);  // tetszőleges számú middleware függvény megadható paraméterben
privateRouter.get('/devices/:id', get);
privateRouter.post('/devices', insert);
privateRouter.put('/expenses/:id', update);
privateRouter.delete('/devices/:id', remove);

// user routers

publicRouter.post('/register', registerUser);
publicRouter.post('/login', loginUser);

module.exports = {
    publicRouter,
    privateRouter
}