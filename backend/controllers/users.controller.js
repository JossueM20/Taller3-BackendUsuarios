const User=require('../models/User');
const usersC = {};
const jwt = require('jsonwebtoken');

usersC.getUsers=async(req,res) => {
    res.send('Bienvenido al backedn de gestion de usuarios');
}

usersC.addUser=async(req,res)=>{
    const{email,password}=req.body;
    const newUser= new User({
        email:email,
        password:password});
    await newUser.save();
    const token=jwt.sign({_id:
    newUser._id},'secretkey');
    res.status(200).json({token});
}

usersC.loginUser= async(req,
    res)=>
    {
    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.status(401).send("El correo no existe");
    if(user.password!== password) return res.status(401).send("Clave incorrecta");
    const token=jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
    }

usersC.getTasks=async(req,res)=>
    {
    res.json([
    {
    _id:1,
    name:'Tarea1',
    descripcion:'Informacion tarea1'
    },
    {
    _id:2,
    name:'Tarea2',
    descripcion:'Informacion tarea2'
    },
    {
    _id:3,
    name:'Tarea3',
    descripcion:'Informacion tarea3'
    }
    ])
    }

usersC.geTasksPrivate =  async(req, res) => 
{
    res.json([
    {
    _id:1,
    name:'Tarea1',
    descripcion:'Informacion tarea1'
    },
    {
    _id:2,
    name:'Tarea2',
    descripcion:'Informacion tarea2'
    },
    {
    _id:3,
    name:'Tarea3',
    descripcion:'Informacion tarea3'
    }
    ])
}

module.exports=usersC;