'use strict'
const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./config/routes');

const config_db = require('./config/database').configMongo();


app.use(cors());
app.use(bodyParser.urlencoded(
  {
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
  }
));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, auth, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Requested-Method');
  res.header('Access-Control-Allow-Method', 'POST');
  res.header('Access', 'POST');

  next();
});

app.use('/api',routes);

// setTimeout(function() {
  mongoose.connect('mongodb://'+config_db.host+':'+config_db.port+'/'+config_db.name, {}, (err,res) => {
    if(err){
      console.log("intentando conectar",err);
    } else {
      console.log("intentando conectar",res);
    }
  })
// }, 20000);

app.listen(2889, () =>
  console.log('Example app listening on port 2003')
)


module.exports = app;
