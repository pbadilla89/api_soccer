'use strict'

var Match = require('../models/matches');
var Team = require('../models/teams');
var League = require('../models/leagues');

function list(req, res) {
  Match.find({}).
  populate("idHome")
  .populate({
    path: 'idHome.country',
    model: 'Country'
  }).
  populate("idAway")
  .populate({
    path: 'idAway.country',
    model: 'Country'
  }).
  populate("league").
  exec((err, matches) => {
    if(err){
      res.send({datos: "error"});
    }
    Team.find({}).
    populate("country").
    populate("league")
    .populate({
      path: 'league.country',
      model: 'Country'
    }).
    exec((err, teams) => {
      if(err){
        res.send({datos: "error"});
      }
      League.find({}).
      populate("country").
      exec((err, leagues) => {
        if(err){
          res.send({datos: "error"});
        }
        res.send({matches, teams, leagues})
      });
    });
  });
}

function playMatch(req, res){

  const { match } = req.body

  const match2 = {
    name: match.name,
    win: match.win,
    idHome: match.idHome._id,
    idAway: match.idAway._id,
    league: match.league._id
  }

  Match.findByIdAndUpdate(match._id, match2, (err, mth) => {
    if ( err ) res.send({status: false, mensaje: "Se genero un error"});

    const newHome = {
      pj: String(match.win) === String(match.idHome._id) ? match.idHome.pj+1 : match.idHome.pj,
      pe: String(match.win) === "0" ? match.idHome.pe+1 : match.idHome.pe,
      pg: String(match.win) === String(match.idHome._id) ? match.idHome.pg+1 : match.idHome.pg,
      pp: String(match.win) === String(match.idAway._id) ? match.idHome.pp+1 : match.idHome.pp,
      pts: String(match.win) === String(match.idHome._id) ? match.idHome.pts+3 : match.win === "0" ? match.idHome.pts+1 : match.idHome.pts,
    }

    console.log("*******************")
    console.log(match.idHome._id)
    console.log("*******************")
    console.log(match.idHome)
    console.log("*******************")
    console.log(newHome )
    console.log("*******************")

    Team.findByIdAndUpdate(match.idHome._id,{ ...match.idHome, ...newHome }, (err2, userUpload) => {
      if ( err2 ) res.send({status: false, mensaje: "Se genero un error"});

      const newAway = {
        pj: String(match.win) === String(match.idAway._id) ? match.idAway.pj+1 : match.idAway.pj,
        pe: String(match.win) === "0" ? match.idAway.pe+1 : match.idAway.pe,
        pg: String(match.win) === String(match.idAway._id) ? match.idAway.pg+1 : match.idAway.pg,
        pp: String(match.win) === match.idHome._id ? match.idAway.pp+1 : match.idAway.pp,
        pts: String(match.win) === String(match.idAway._id) ? match.idAway.pts+3 : match.win === "0" ? match.idAway.pts+1 : match.idAway.pts,
      }

      console.log("*******************2")
      console.log(match.idAway._id)
      console.log("*******************2")
      console.log(match.idAway)
      console.log("*******************2")
      console.log(newAway )
      console.log("*******************2")

      Team.findByIdAndUpdate(match.idAway._id,{ ...match.idAway, ...newAway }, (err3, userUpload) => {
        if ( err3 ) res.send({status: false, mensaje: "Se genero un error"});

        res.send({status: true, mensaje: "Se Guardo Correctamente"});
      })

      
    })

  } )
  
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
  list,
  playMatch
}
