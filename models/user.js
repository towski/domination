require('./orm')

User = ORM.new()
ORM.extend(User, 'users')

