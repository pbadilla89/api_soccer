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

  console.log("va a guardar1")

  team.save((err2, cnt) => {
    if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});

    console.log("va a guardar2")
    
    League.find({}).
    exec((err, leagues) => {
      if(err){
        res.send({datos: "error"});
      }

      console.log("va a guardar3")

      Team.find({}).
      exec((err, teams) => {
        if(err){
          res.send({datos: "error"});
        }

        console.log("va a guardar5")

        teams.map( ( tms, indTms ) => {
          console.log("va a guardar6")
          
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
            console.log("va a guardar7")
          })
          console.log("va a guardar8")
      })

        // Match.deleteMany({})
        console.log("va a guardar9")
        for(let indLeg = 0; indLeg < leagues.length; indLeg++){
          console.log("va a guardar92",teams)
          console.log("va a guardar93",leagues[indLeg]["_id"])

          let newTeams = myFilter(teams, "league", leagues[indLeg]["_id"])
          console.log("va a guardar10", newTeams)
          for(let indTms = 0; indTms < newTeams.length; indTms++){
            let tms = newTeams[indTms]
            console.log("va a guardar11")
            for(let indTms2 = 0; indTms2 < newTeams.length; indTms2++){
              let tms2 = newTeams[indTms2]
              console.log("va a guardar12")
              let founded = tms._id === tms2._id? true : false
    
              if(!founded){
                let matches2 = new Match()
                matches2.idHome = tms._id
                matches2.idAway = tms2._id
                matches2.win = "-1"
                matches2.league = leagues[indLeg]._id
                matches2.save((err2, cnt) => {
                  if ( err2 ) res.send({status: false, mensaje: "Se genero un error"})
                })
              }
            }
          }
          if(indLeg === leagues.length-1){
            console.log("va a guardar13")
            let teams = [ cnt ]
            res.send({status: true, mensaje: "Se Guardo Correctamente",teams});
          }
        }
      });
    });
  });
}

function myFilter(array, cross, valid){
  let newArray = []
  for(let indAry = 0; indAry < array.length; indAry++){
    const ary = array[indAry]

    console.log(cross)
    console.log(ary[cross])
    console.log(valid)

    if(ary[cross] == valid){
      newArray.push(ary[cross])
    }
  }
  return newArray
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
