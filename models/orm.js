var mongodb = require('mongodb');

ORM = function(methods){
  this.initialize(methods)
}

ORM.prototype = {
  initialize: function(url){
    var self = this;
    mongodb.connect(url, function(error, db){
      if (error) { throw error }
      self.db = db
      ORM.after()
    })
  },
  find: function(table, class, search, lambda, options){
    new mongodb.Collection(this.db, table).find(search, options).toArray(function(err, items){
      if(err){ throw err }
      var objs = []
      for(item in items){
        objs.push(new class(items[item]))
      }
      lambda(objs[0])
    })
  }
}
ORM.instance = new ORM("mongodb://localhost:27017/test")

ORM.new = function(){
  return function(methods){
    this.initialize(methods)
  }
}

ORM.extend = function(class, table_name){
  class.table = table_name
  class.prototype = {
    initialize: function(variables){
      var self = this
      variables.each(function(key, value){
        if(key != "_id"){
          self[key] = value
        }else{
          self.id = value
        }
      })
      this.attributes = variables
    },
    save: function(callback){
      var self = this
      new mongodb.Collection(ORM.instance.db, class.table).insert(this.attributes, {safe:true}, function(err, obj){
        obj[0].each(function(key, value){
          if(key != "_id"){
            self[key] = value
          }else{
            self.id = value
          }
        })
        self.attributes = obj[0]
        callback(self)
      })
    }
  }
  
  class.find = function(id, lambda, options){
    if(!options){
      options = {}
    }
    ORM.instance.find(this.table, class, {_id: id}, lambda, options)
  }
}

Object.prototype.each = function(lambda){
  for(key in this) {
    if(key != 'each'){
      lambda(key, this[key])
    }
  }
}