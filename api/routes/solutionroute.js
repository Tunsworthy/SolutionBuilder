
'use strict';
var mongoose = require('mongoose'),
  Solution = mongoose.model('Solution')


module.exports = function(app) {
//Get All
  app.get('/solution',function(req,res){
    //console.log(req.params)
    Solution.find({},function(err,solution){
      if (err)
          res.send(err)
      res.json(solution)
    })
});
//Delete by ID
app.delete('/solution',function(req,res){
    console.log(req.query)
    Solution.deleteOne({retrieveid: req.query.retrieveid},function(err,solution){
      if(err)
        res.send(err)
      res.json({message: req.query.id + ' Solution removed'})}
      );
  })
}

//Update Solution by ID
app.put('/solution',function(req,res){
  console.log("Updating solution",req.body)
   Solution.findOneAndUpdate({retrieveid: req.query.retrieveid},req.body,{new: true},function(err,solution){
      if (err)
          res.send(err)
      res.json(solution)
    })
});

//Post solution
app.post('/solution',function(req,res){
     console.log("Posting Solition",req.body)
     //var data = JSON.parse(req.body)
     //console.log(data)
    var new_solution = new Solution(req.body);
    new_solution.save(function(err,solution){
      if(err)
        res.status(500),
        res.send(err)
      res.json(solution)
    })
  });






//Gets Solution By ID  
  app.get('/solution/uid',function(req,res){
    //console.log(req.query.uid)
    Solution.find({uid: req.query.uid},['retrieveid','Created_date'],function(err,solution){
      //console.log(solution)
      if (err)
          res.send(err)
      res.json(solution)
    })
      });


//Gets Solution By Name  
  app.get('/solution/retrieveid',function(req,res){
   // console.log("called retrieveid",req.query.retrieveid)
    Solution.findOne({retrieveid: req.query.retrieveid},function(err,solution){
      if (err)
          res.send(err)
      //console.log(solution)
      res.json(solution)
    })
      });

//Lists only the name of Solutions
  app.get('/solution/list',function(req,res){
    Solution.find({},['retrieveid','Created_date','uid'],function(err,solution){
      if (err)
          res.send(err)
      res.json(solution)
    })
   });




  app.delete('/solution/all',function(req,res){
    Solution.deleteMany({},function(err,solution){
      if(err)
        res.send(err)
      res.json({message: 'All Solutions removed'})}
      );
  });
