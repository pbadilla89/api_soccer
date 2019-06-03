'use strict'

var Country = require('../models/countries');

function list(req, res) {
  Country.find({}).
  exec((err, Countries) => {
    if(err){
      res.send({datos: "error"});
    }
    res.send({Countries})
  });
}
function add(req, res) {
  var country = new Country()
  var params = req.body

  country.name = params.name

  country.save((err2, cnt) => {
    if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
    console.log("guardo")
    let countries = [ cnt ]
    res.send({status: true, mensaje: "Se Guardo Correctamente",countries});
  });
}

function update (req, res){
  var id = req.params.id;
  var update = req.body;

  Country.findByIdAndUpdate(id,update, (err, userUpload) => {
    res.send({editado: true});
  })
}

function remove (req, res){
  var id = req.body._id;

  Country.findByIdAndRemove(id, (err, userUpload) => {
    res.send({eliminado: true});
  })
}

module.exports = {
  add,
  update,
  list,
  remove
}
