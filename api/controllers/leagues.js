'use strict'

var League = require('../models/leagues');
var Country = require('../models/countries');

function list(req, res) {
  League.find({}).
  populate("country").
  exec((err, leagues) => {
    if(err){
      res.send({datos: "error"});
    }
    Country.find({}).
    exec((err, countries) => {
      if(err){
        res.send({datos: "error"});
      }
      res.send({leagues, countries})
    });
  });
}
function add(req, res) {
  var league = new League()
  var params = req.body

  league.name = params.name
  league.country = params.country

  league.save((err2, cnt) => {
    if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
    console.log("guardo")
    let leagues = [ cnt ]
    res.send({status: true, mensaje: "Se Guardo Correctamente",leagues});
  });
}

function update (req, res){
  var id = req.params.id;
  var update = req.body;

  League.findByIdAndUpdate(id,update, (err, userUpload) => {
    res.send({editado: true});
  })
}

function remove (req, res){
  var id = req.body._id;

  League.findByIdAndRemove(id, (err, userUpload) => {
    res.send({eliminado: true});
  })
}

module.exports = {
  add,
  update,
  list,
  remove
}
