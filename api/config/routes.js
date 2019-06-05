'use strict'

var express = require('express')
var UserController = require('../controllers/user')
var CountryController = require('../controllers/countries')
var LeagueController = require('../controllers/leagues')
var TeamController = require('../controllers/teams')
var MatchController = require('../controllers/matches')

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

api.post('/addTeam',TeamController.add)
api.post('/removeTeam',TeamController.remove)
api.post('/listTeams',TeamController.list)

api.post('/addMatch',MatchController.add)
api.post('/listMatches',MatchController.list)
api.post('/playMatch',MatchController.playMatch)

api.post('/refreshMatch',TeamController.refresh)

api.post('/loginUser',UserController.login)
api.post('/validateSession',UserController.validateSession)

module.exports = api
