require('./orm')

Leaderboard = ORM.new()
ORM.extend(Leaderboard, 'leaderboards')

