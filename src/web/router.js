const { Router } = require('express');
const { get, list, insert, update, remove } = require('./deviceHandler');
const { register, login } = require('./userHandler');
const auth = require('./auth/jwt');

// public és private router szétválasztása
const publicRouter = Router();
const privateRouter = Router();

privateRouter.use(auth);

publicRouter.get('/', (req,res) => {
    res.send('Server working');
})

// device routers

privateRouter.get('/devices', list);
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