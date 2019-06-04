'use strict'

var Team = require('../models/teams');
var Country = require('../models/countries');
var League = require('../models/leagues');
var Match = require('../models/matches');

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
    
    League.find({}).
    exec((err, leagues) => {
      if(err){
        res.send({datos: "error"});
      }
      Team.find({}).
      exec((err, teams) => {
        if(err){
          res.send({datos: "error"});
        }

        teams = teams.map( ( tms, indTms ) => {
          
          const id = tms._id

          const newTms = {
              name: tms.name,
              country: tms.country,
              league: tms.league,
              pts: 0,
              pj: 0,
              pg: 0,
              pe: 0,
              pp: 0
          }

          Team.findByIdAndUpdate(id,newTms, (err, userUpload) => {
          })
      })

        Match.remove({})
        for(let indLeg = 0; indLeg < leagues.length; indLeg++){
          let newTeams = teams.filter( (tms) => tms.league === leagues[indLeg].id )
          for(let indTms = 0; indTms < newTeams.length; indTms++){
            let tms = newTeams[indTms]
            for(let indTms2 = 0; indTms2 < newTeams.length; indTms2++){
              let tms2 = newTeams[indTms2]
              let founded = tms.id === tms2.id? true : false
    
              if(!founded){
                let matches2 = new Match()
                matches2.idHome = tms._id
                matches2.idAway = tms2._id
                matches2.win = "-1"
                matches2.league = leagues[indLeg]._id
                matches2.

                team.save((err2, cnt) => {
                  if ( err2 ) res.send({status: false, mensaje: "Se genero un error"})
                })
              }
            }
          }
          if(indLeg === leagues.length-1){
            let teams = [ cnt ]
            res.send({status: true, mensaje: "Se Guardo Correctamente",teams});
          }
        }
      });
    });
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
