'use strict';
var mongoose = require('mongoose'),
  ECX = mongoose.model('ECX')


module.exports = function(app) {
  // Event Routes
  app.get('/ecx',function(req,res){
    //console.log(req.params)
    ECX.find({},function(err,ecx){
      if (err)
          res.send(err)
      res.json(ecx)
    })
      });


  app.post('/ecx',function(req,res){
    // console.log(req.body)
     //var data = JSON.parse(req.body)
     //console.log(data)
    var new_ecx = new ECX(req.body);
    new_ecx.save(function(err,ecx){
      if(err)
        res.status(500),
        res.send(err)
      res.json(ecx)
    })
  });

  app.delete('/ecx/all',function(req,res){
    ECX.deleteMany({},function(err,ecx){
      if(err)
        res.send(err)
      res.json({message: 'All ECX Profiles removed'})}
      );
  });

}