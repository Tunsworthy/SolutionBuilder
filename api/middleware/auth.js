'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User')

const auth = function(req, res, next) {
    if(req.header('Authorization') == null){res.status(401).send({error: 'No authorized token provided'})}
    else{
         const token = req.header('Authorization').replace('Bearer ', '')
         const data = jwt.verify(token, process.env.JWT_KEY)
         const check = new Promise(function(resolve, reject) {
            resolve(User.findOne({ _id: data._id, 'tokens.token': token }))
        });
        (async function() {
            try {
                await check;
                next();
            } catch(err) {
                res.status(401).send({ error: 'Not authorized to access this resource' });
            } 
        })(); 
            }
}
module.exports = auth