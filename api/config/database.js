'use strict'

exports.configMongo = function(params){
  var host = "localhost";
  // var host = "45.55.94.252";
  var port = "27017";
  // var port = "27666";
  var name = "soccer";

  if(params != null){
    if(params["host"] != null){
      host = params["host"];
    }
    if(params["port"] != null){
      port = params["port"];
    }
    if(params["name"] != null){
      name = params["name"];
    }
  }

  return {
    host: host,
    port: port,
    name: name
  };
};
