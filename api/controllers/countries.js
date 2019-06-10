'use strict'

var Country = require('../models/countries');

function list(req, res) {
  Country.find({}).
  exec((err, countries) => {
    if(err){
      res.send({datos: "error"});
    }
    res.send({countries})
  });
}
function save(req, res) {
  var params = req.body

  if( typeof params._id != "undefined" ){
    const update = {
      name: params.name
    }
    Country.findByIdAndUpdate(params._id,update, (err, userUpload) => {
      res.send({editado: true})
    })
  } else {
    let country = new Country()
    country.name = params.name
    country.save((err2, cnt) => {
      if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
      console.log("guardo")
      let countries = [ cnt ]
      res.send({status: true, mensaje: "Se Guardo Correctamente",countries});
    });
  }
}

function remove (req, res){
  var _id = req.body._id

  Country.findByIdAndRemove(_id, (err, userUpload) => {
    res.send({eliminado: true});
  })
}

module.exports = {
  save,
  list,
  remove
}
