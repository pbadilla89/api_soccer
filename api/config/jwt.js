'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "pablinkandresbadillaconcha";

exports.createToken = function(user){
  user.iat = moment().unix();
  user.exp = moment().add(30,'days').unix();
  return jwt.encode(user, secret);
};

exports.validarToken = function(req,res,next){
  if(!req.headers.auth){
    console.log("no tiene cabecera");
  } else {

    try{
      
      var token = req.headers.auth.replace(/['"]+/g,'');
      var validate = jwt.decode(token,secret);

      if(validate.exp > moment().unix()){
        return res.send({message: "cuek"});
      }
      req.user = validate;
    } catch(e){
      return res.send({message: "cuek"});
    }

    next()
  }
}

const validateSession = (req, res) => {
  const params = req.body;
  if(!params.auth){
    res.send({status: false, message: "No se ha enviado el token"});
  } else {

    try{
      
      var token = params.auth.replace(/['"]+/g,'');
      var validate = jwt.decode(token,secret);

      if(validate.exp > moment().unix()){
        res.send({status: false, message: "el token ya expiro"});
      } else {
        res.send({status: true, message: "el token es valido"});
      }
    } catch(e){
      res.send({status: false, message: "se genero un error"});
    }
  }
}

module.exports = {
  validateSession
}
