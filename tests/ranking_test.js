require('../models/ranking')
var assert = require('assert')

ORM.after = function(){
  var ranking = new Ranking({ranking: ["Kelpe", "that"]}, function(){
    process.exit()
  })
}