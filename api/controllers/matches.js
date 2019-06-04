'use strict'

var Match = require('../models/matches');
var Team = require('../models/teams');
var League = require('../models/leagues');

function list(req, res) {
  Match.find({}).
  populate("idHome").
  populate("idAway").
  populate("league").
  exec((err, matches) => {
    if(err){
      res.send({datos: "error"});
    }
    Team.find({}).
    exec((err, teams) => {
      if(err){
        res.send({datos: "error"});
      }
      League.find({}).
      exec((err, leagues) => {
        if(err){
          res.send({datos: "error"});
        }
        res.send({matches, teams, leagues})
      });
    });
  });
}
function add(req, res) {
  Match.remove({})
  var matches = new Match()
  var params = req.body

  matches.name = params.name
  matches.league = params.league

  matches.idHome = params.idHome
  matches.idAway = params.idAway
  matches.win = params.win

  matches.save((err2, cnt) => {
    if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});
    console.log("guardo")
    let teams = [ cnt ]
    res.send({status: true, mensaje: "Se Guardo Correctamente",teams});
  })
}

module.exports = {
  add,
  list
}