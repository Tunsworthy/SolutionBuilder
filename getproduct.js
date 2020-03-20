'use strict';
var fetch = require('node-fetch');
var Headers = require('fetch-headers/headers-es5.min.js')

var getHeaders = new Headers();
getHeaders.append("Accept", "application/json");
getHeaders.append("Content-Type", "application/json");

var getROptions = {
	method: 'GET',
	headers: getHeaders,
	redirect: 'follow'
};

var geturl = "http://localhost:3000/prodcut"

function getproduct(){
	fetch(geturl, getROptions)
	.then(response => response.json())
	.then(result => { 
		//console.log(Object.keys(result.data).length)
		result.data.forEach((element,index,array) => {
			transdata.push(element)
		})
		return(resolve());
	})
	.catch(error => console.log('error', error));

};

getproduct()