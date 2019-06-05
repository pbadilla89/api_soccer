'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "pablinkandresbadillaconcha";

exports.createToken = function(user){
  user.iat = moment().unix();
  user.exp = moment().add(30,'days').unix();
  return jwt.encode(user, secret);
}

exports.midValidarToken = function(req,res,next){
  console.log(req.headers)
  if(!req.headers.token){
    return res.send({status: false, message: "no tiene token de AUTH"});
  } else {

    try{
      
      var token = req.headers.token.replace(/['"]+/g,'');
      var validate = jwt.decode(token,secret);

      if(validate.exp > moment().unix()){
        return res.send({status: false, message: "cuek"});
      }
      req.user = validate;
    } catch(e){
      return res.send({status: false, message: "cuek"});
    }

    next()
  }
}

exports.validarToken = function(token){
  try{
    var validate = jwt.decode(token,secret);

    if(validate.exp > moment().unix()){
      return false
    }
    return true
  } catch(e){
    return false
  }
}
