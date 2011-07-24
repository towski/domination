require('../models/leaderboard')
var assert = require('assert')
var name = "Top 10 bars in the city"

ORM.after = function(){
  var leaderboard = new Leaderboard({name: name, ranking: ["this", "that"]})
  leaderboard.save(function(l){
    var leaderboard = l
    assert.equal(name, leaderboard.name)
    Leaderboard.find({_id: leaderboard.id}, function(obj){
      assert.equal(leaderboard.name, obj.name)
      assert.deepEqual(leaderboard.ranking, obj.ranking)
      process.exit()
    })
  })
}