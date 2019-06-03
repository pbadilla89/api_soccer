'use strict'

var League = require('../models/leagues');

function list(req, res) {
  League.find({}).
  populate("league_id")
  exec((err, leagues) => {
    if(err){
      res.send({datos: "error"});
    }
    res.send({leagues})
  });
}
function add(req, res) {
  var country = new League()
  var params = req.body

  country.name = params.name

  country.save((err2, cnt) => {
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
