'use strict'

var express = require('express')
var UserController = require('../controllers/user')

var multipart = require('connect-multiparty')
var md_upload_excel = multipart({uploadDir: './uploads/'})

var md_auth = require("./jwt")

var api = express.Router()
api.post('/addUser',UserController.add)
api.post('/loginUser',UserController.login)
api.post('/removeUser',UserController.remove)
api.post('/listUsers',UserController.list)
api.post('/validateSession',UserController.validateSession)

module.exports = api
