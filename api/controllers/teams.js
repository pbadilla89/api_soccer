'use strict'

var Team = require('../models/teams');
var Country = require('../models/countries');
var League = require('../models/leagues');

function list(req, res) {
  Team.find({}).
  populate("country").
  populate("league").
  exec((err, teams) => {
    if(err){
      res.send({datos: "error"});
    }
    Country.find({}).
    exec((err, countries) => {
      if(err){
        res.send({datos: "error"});
      }
      League.find({}).
      exec((err, leagues) => {
        if(err){
          res.send({datos: "error"});
        }
        res.send({teams, countries, leagues})
      });
    });
  });
}
function add(req, res) {
  var team = new Team()
  var params = req.body

  team.name = params.name
  team.country = params.country
  team.league = params.league
  team.pts = 0
  team.pj = 0
  team.pg = 0
  team.pe = 0
  team.pp = 0

  team.save((err2, cnt) => {
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
