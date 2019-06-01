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

    next();
  }
};
