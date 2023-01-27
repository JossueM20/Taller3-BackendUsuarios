const{Router} = require ('express');
const router=Router();
const user=require('../controllers/users.controller');
const jwt = require('jsonwebtoken');

router.get('/', user.getUsers);
router.post('/registro', user.addUser);
router.post('/ingreso',user.loginUser);
router.get('/tareas', user.getTasks);
router.get('/tareasprivadas', verificarToken, user.geTasksPrivate);

function verificarToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Solicitud no autorizada');
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token == 'null'){
        return res.status(401).send("Solicitud no autorizada");
    }

    const comprobar = jwt.verify(token, 'secretkey')
    req.userId = comprobar._id;
    next();

};

module.exports=router;