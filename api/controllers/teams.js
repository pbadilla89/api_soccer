'use strict'

var Team = require('../models/teams');

function list(req, res) {
  Team.find({}).
  exec((err, teams) => {
    if(err){
      res.send({datos: "error"});
    }
    res.send({teams})
  });
}
function add(req, res) {
  var country = new Team()
  var params = req.body

  country.name = params.name

  country.save((err2, cnt) => {
    if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
    console.log("guardo")
    let teams = [ cnt ]
    res.send({status: true, mensaje: "Se Guardo Correctamente",teams});
  });
}

function update (req, res){
  var id = req.params.id;
  var update = req.body;

  Team.findByIdAndUpdate(id,update, (err, userUpload) => {
    res.send({editado: true});
  })
}

function remove (req, res){
  var id = req.body._id;

  Team.findByIdAndRemove(id, (err, userUpload) => {
    res.send({eliminado: true});
  })
}

module.exports = {
  add,
  update,
  list,
  remove
}
