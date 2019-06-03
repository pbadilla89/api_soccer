'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../config/jwt');

function list(req, res) {
  User.find({}).
  exec((err, users) => {
    if(err){
      res.send({datos: "error"});
    }
    res.send({users})
  });
}
function add(req, res) {
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.lastname = params.lastname;
  user.email = params.email;
  user.role = params.role;


  console.log(params);

  if(params.password){
    bcrypt.hash(params.password, null, null, function(err, hash){
      if ( err ) res.send({status: false, mensaje: "Se genero un error"});
      console.log("va a guardar")
      console.log(hash)
      user.password = hash;
      user.save((err2, usr) => {
        if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
        console.log("guardo")
        let users = [ usr ]
        res.send({status: true, mensaje: "Se Guardo Correctamente",users});
      });
    });
  }
}

function update (req, res){
  var id = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(id,update, (err, userUpload) => {
    res.send({editado: true});
  })
}

function remove (req, res){
  var id = req.body._id;

  User.findByIdAndRemove(id, (err, userUpload) => {
    res.send({eliminado: true});
  })
}

function login (req, res){
  var params = req.body;
  console.log(params);

  var email = params.email;
  var password = params.password;

  User.findOne({email: email}, (err, user) => {
    console.log(err);
    console.log("---");
    console.log(user);
    if(err != null){
      res.send({status: false, mensaje: "se genero un error"});
    }
    if(user != null){
      bcrypt.compare(password, user.password,function(err, check) {
        if(check){
          console.log("*****************")
          console.log(jwt)
          console.log("*****************")
          res.send({status: true, mensaje: "muy bien", token: jwt.createToken(user)});
        } else {
          res.send({status: false, mensaje: "no coinside la contraseña"});
        }
      });
    } else{
      res.send({status: false, mensaje: "no existe el usuario"});
    }
  });
}


const validateSession = (req, res) => {
  const params = req.body;
  if(!params.token){
    res.send({status: false, message: "No se ha enviado el token"});
  } else { 
    var token = params.token.replace(/['"]+/g,'')
    var validate = jwt.validarToken(token)

    if(!validate){
      res.send({status: false, message: "el token ya expiro"});
    } else {
      res.send({status: true, message: "el token es valido"});
    }
  }
}

module.exports = {
  login,
  add,
  update,
  list,
  remove,
  validateSession
}
