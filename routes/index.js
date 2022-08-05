'use strict';
var fetch = require('node-fetch');
const fs = require('fs').promises;
module.exports = function(app) {
const sdwan = require('./sdwan.js');

const { ExpressOIDC } = require('@okta/oidc-middleware');

const oidc = new ExpressOIDC({
  appBaseUrl: process.env.OKTA_BASEAPP_URL,
  issuer: process.env.issuer,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  redirect_uri: process.env.redirect_uri,
  scope: 'openid profile'
});
app.use(oidc.router);

oidc.on('ready', () => {
  app.listen(port, () => console.log(`Started!`));
});

oidc.on('error', err => {
  console.log('Unable to configure ExpressOIDC', err);
});


/* GET home page. */
//oidc.ensureAuthenticated()
app.get('/',oidc.ensureAuthenticated(), function(req, res, next) {
            if(req.query.retrieveid){var rid = req.query.retrieveid}
            else{var rid = null}
        if(req.query.alertm){
            var amessage = req.query.alertm
            var atype = req.query.alertt
        }
        else{
           var amessage = null
           var atype = null
        }
            res.render('index', {title: 'Solution Builder', path: req.path,retrieveid: rid,username:req.userContext.userinfo.given_name,alertm: amessage,alertt: atype})
 });


app.get('/product/list',oidc.ensureAuthenticated(), function(req, res) {
    console.log('calledproductlist')
    const url = process.env.ProductAPIURL +'/product/list';
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json()
                .then(function(data) {
                res.json(data)     
            })
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });


        })
    });

//const url = ProductAPIURL+'/product/name/?name=' + selection;
app.get('/product/name/',oidc.ensureAuthenticated(), function(req, res) {
    console.log('calledproductname')
    const url = process.env.ProductAPIURL +'/product/name/?name=' +req.query.name;
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json()
                .then(function(data) {
                res.json(data)     
            })
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });


        })
    });

//const url = ProductAPIURL+'/product/id/?id=' + rprocut;
app.get('/product/id',oidc.ensureAuthenticated(), function(req, res) {
    //console.log('calledproductid',req.query)
    const url = process.env.ProductAPIURL +'/product/id/?id=' +req.query.id;
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json()
                .then(function(data) {
                res.json(data)     
            })
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });


        })
    });

//quote save
app.post('/solution/save',oidc.ensureAuthenticated(), function(req, res) {
    console.log('solutionsavecalled');
    console.log('solution saver',req.userContext.userinfo.sub);
    //add UID to body
    //var uiddetails = {"uid": req.userContext.userinfo.sub};
    //console.log("userid",uiddetails);
    req.body.uid = req.userContext.userinfo.sub
    console.log(req.body);

    const url = process.env.SolutionsaverAPIURL+'/solution';
    var quoteOptions = {
        method: 'Post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    };
    //console.log("looking at url + quote",url,quoteOptions)
    fetch(url,quoteOptions)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json()
                    .then(function(data) {
                        res.status = 100
                        res.json(data) 
                        console.log(data.retrieveid)    
            })
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });

        })    
    });
//get quote
//localhost:3002/quote/retrieveid?retrieveid=MHEGIQ
app.post('/solution/retrieve',oidc.ensureAuthenticated(), function(req, res) {
    console.log('solution retrieve',req.body)
    console.log(req.body.retrieveid)
    //console.log(req);
    const url = process.env.SolutionsaverAPIURL +'/solution/retrieveid?retrieveid='+req.body.retrieveid;
    //console.log(url)
    var quoteOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
};
    fetch(url, quoteOptions)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json()
                    .then(function(data) {
                        res.json(data)    
            })
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });

        })    
    });

//go to quote page
app.get('/quote',oidc.ensureAuthenticated(), function(req, res, next) {
    console.log('quote retrieve',req.query.retrieveid)
    //console.log(req.body.retrieveid)
            res.render('quote', {title: 'Quote',retrieveid: req.query.retrieveid,username:req.userContext.userinfo.given_name})
});

//go to ECX Page
app.get('/ECX', async function(req, res, next) {
    fetch(process.env.ProductAPIURL +'/ecx')
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            //resolve(result)
            res.render('ecxprofiles', {title: 'ECX Profiles',list: result})
        })
    .catch(error => console.log('error', error));

});

app.get('/ECXTable', async function(req, res, next) {
    fetch(process.env.ProductAPIURL +'/ecx')
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            //resolve(result)
            res.render('ecxtable', {title: 'ECX Profiles',list: result})
        })
    .catch(error => console.log('error', error));

});

app.get('/SDWANTable', async function(req, res, next) {
    //console.log(req)
    let data = await sdwan.getsolution(req)
    let groupeddata = await sdwan.groupdata(data);
    //console.log(groupeddata)
    res.render('sdwantable', {title: 'SD-WAN Table',list: groupeddata})


});


//go to Solution List
app.get('/slist',oidc.ensureAuthenticated(), function(req, res, next) {
        if(req.userContext.userinfo.sub === process.env.adminid){var admin = true}
        else{var admin = false};
        if(req.query.alertm){
            var amessage = req.query.alertm
            var atype = req.query.alertt
        }
        else{
           var amessage = null
           var atype = null
        }
       // console.log(req.userContext.userinfo)
        getslist(req.userContext.userinfo.sub)
            .then((result) => {
                if(result){
                    var data = result
                }
                else{
                    var data = null
                }
                //console.log(data)
                res.render('solutionlist', {title: "Solution List", path: req.path,username: req.userContext.userinfo.given_name,list: data,alertm: amessage,alertt: atype,admin: admin})
            });


           // res.render('solutionlist', {title: "Solution List", path: req.path,username: "test"}) 
        });

app.get('/s/delete', function(req, res, next) {
 console.log("called delete",req.query.retrieveid)
  //req.query.retrieveid
let options = {
    method: 'DELETE',
    redirect: 'follow'
};
fetch(process.env.SolutionsaverAPIURL +'/solution/?retrieveid='+req.query.retrieveid,options)
        .then(response => {
           console.log(response.status)
           if(response.status === 200){
            var message = "Solution deleted Successfully"
            var type = "success"
           }
           else{
            var message = "Error while trying to delete solution"
            var type = "warning"
           }
            res.redirect('/slist/?alertm='+message+'&alertt='+type)
           
        })
    .catch(error => console.log('error', error));  
});

app.put('/s/update', function(req, res, next) {
 console.log("called update",req.query.retrieveid)
  //req.query.retrieveid
if(!req.body.uid){
    req.body.uid = req.userContext.userinfo.sub
}
let options = {
    method: 'PUT',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
};

fetch(process.env.SolutionsaverAPIURL +'/solution/?retrieveid='+req.query.retrieveid,options)
        .then(response => {
            res.status(200).json({message:"Solution Updated Successfully",type: "success"})
        })
    .catch(error => console.log('error', error));  
});

//this is the end
}
//this is the end




function getslist(uid){
    console.log('adminid '+ process.env.adminid)
    console.log('user id' + uid)
    if(uid === process.env.adminid){var url = process.env.SolutionsaverAPIURL +'/solution/list'}
    else {var url = process.env.SolutionsaverAPIURL +'/solution/uid/?uid='+uid}
        console.log('URL to send '+url)
    return new Promise((resolve,reject) => {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            //console.log(result)
            resolve(result)
        })
    .catch(error => console.log('error', error));  
    }) 
 }
