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

api.post('/addUser', UserController.add)
api.post('/removeUser', md_auth.midValidarToken, UserController.remove)
api.post('/listUsers', md_auth.midValidarToken, UserController.list)

api.post('/addCountry', md_auth.midValidarToken, CountryController.add)
api.post('/removeCountry', md_auth.midValidarToken, CountryController.remove)
api.post('/listCountries', md_auth.midValidarToken, CountryController.list)

api.post('/addLeague', md_auth.midValidarToken, LeagueController.add)
api.post('/removeLeague', md_auth.midValidarToken, LeagueController.remove)
api.post('/listLeagues', md_auth.midValidarToken, LeagueController.list)

api.post('/addTeam', md_auth.midValidarToken, TeamController.add)
api.post('/removeTeam', md_auth.midValidarToken, TeamController.remove)
api.post('/listTeams', md_auth.midValidarToken, TeamController.list)

api.post('/addMatch', md_auth.midValidarToken, MatchController.add)
api.post('/listMatches', md_auth.midValidarToken, MatchController.list)
api.post('/playMatch', md_auth.midValidarToken, MatchController.playMatch)

api.post('/refreshMatch', md_auth.midValidarToken, TeamController.refresh)

api.post('/loginUser',UserController.login)
api.post('/validateSession',UserController.validateSession)

module.exports = api
