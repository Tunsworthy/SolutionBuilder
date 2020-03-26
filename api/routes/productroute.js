
'use strict';
var mongoose = require('mongoose'),
  Product = mongoose.model('Product')


module.exports = function(app) {
  // Event Routes
  app.get('/product',function(req,res){
    console.log(req.params)
    Product.find({},function(err,product){
      if (err)
          res.send(err)
      res.json(product)
    })
      });
//Gets Product By ID  
  app.get('/product/id',function(req,res){
    Product.findOne({_id: req.query.id},function(err,product){
      if (err)
          res.send(err)
      res.json(product)
    })
      });

//Update Product by ID
app.put('/product/id',function(req,res){
    console.log("put product id", req.query.id,req.body)
   Product.findOneAndUpdate({_id: req.query.id},req.body,{new: true},function(err,product){
      if (err)
          res.send(err)
      res.json(product)
    })
      });

//Gets Product By Name  
  app.get('/product/name',function(req,res){
    Product.findOne({name: req.query.name},function(err,product){
      if (err)
          res.send(err)
      res.json(product)
    })
      });

//Lists only the name of Products
  app.get('/product/list',function(req,res){
    Product.find({},['type','name'],function(err,product){
      if (err)
          res.send(err)
      res.json(product)
    })
      });


  
  app.post('/product',function(req,res){
     console.log(req.body)
     //var data = JSON.parse(req.body)
     //console.log(data)
    var new_product = new Product(req.body);
    new_product.save(function(err,product){
      if(err)
        res.status(500),
        res.send(err)
      res.json(product)
    })
  });

  app.delete('/product/all',function(req,res){
    Product.deleteMany({},function(err,product){
      if(err)
        res.send(err)
      res.json({message: 'All Products removed'})}
      );
  });

  app.delete('/product',function(req,res){
    console.log(req.query)
    Product.deleteOne({_id: req.query.id},function(err,product){
      if(err)
        res.send(err)
      res.json({message: req.query.id + ' Product removed'})}
      );
  })
}