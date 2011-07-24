require('../models/user')
var assert = require('assert')

ORM.after = function(){
  var user = new User({username: "towski", password: "secret"})
  user.save(function(leaderboard){
    assert.equal("towski", user.username)
    User.find(user.id, function(u){
      assert.equal(user.username, u.username)
      process.exit()
    })
  })
}