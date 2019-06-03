'use strict'

var express = require('express')
var UserController = require('../controllers/user')
var CountryController = require('../controllers/countries')
var LeagueController = require('../controllers/leagues')

var multipart = require('connect-multiparty')
var md_upload_excel = multipart({uploadDir: './uploads/'})

var md_auth = require("./jwt")

var api = express.Router()

api.post('/addUser',UserController.add)
api.post('/removeUser',UserController.remove)
api.post('/listUsers',UserController.list)

api.post('/addCountry',CountryController.add)
api.post('/removeCountry',CountryController.remove)
api.post('/listCountries',CountryController.list)

api.post('/addLeague',LeagueController.add)
api.post('/removeLeague',LeagueController.remove)
api.post('/listLeagues',LeagueController.list)

api.post('/loginUser',UserController.login)
api.post('/validateSession',UserController.validateSession)

module.exports = api
