function claimsolution(){
var value = {"retrieveid": document.getElementById('retrievesolution').value}


var quoteOptions = {
	method: "Post",
	headers: {
	'Content-Type': 'application/json',
	},
	body: JSON.stringify(value),
};

	fetch("/solution/retrieve",quoteOptions)
		.then(function(response){
			response.json()
                .then(function(data) {
                	console.log(data)
                	if(data.uid){
                		alertbox("Solution already claimed","danger")
                	}
                	else{
                		retrievesolution("retrievesolution")
                	}
                })
		})
}


function savesolution(called,retrieve) {
	console.log("save quote called")
	console.log(called,retrieve)
if(called === "update" && retrieve === "null"){
	alertbox("Please save your solution before updating","danger")
	return
}

if(called === "update" || called === "uid" || called === "quote" && retrieve !== null){
	var retrieveid = retrieve
	var url = '/s/update/?retrieveid='+retrieve
	var method = "PUT"
}	

if(called === "save" || called === "quote" && retrieve === undefined){
	console.log("found quote")
	var retrieveid = generate_random_string(6)
	var url = '/solution/save'
	var method = "POST"
}
	//console.log(values)

if(called !== "uid"){	
	var infocontainer = document.getElementById('info');
	var values = getvalue(infocontainer.querySelectorAll('input,select'))
var savedata = {retrieveid: retrieveid,data: infocontainer.innerHTML.toString(),values: values}
console.log(savedata.retrieveid)
}
else{
var savedata = {}
}

var quoteOptions = {
	method: method,
	headers: {
	'Content-Type': 'application/json',
	},
	body: JSON.stringify(savedata),
};

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
                    	console.log('response',data)
                    	if(called === "update"){
                    		alertbox(data.message,data.type)
                    	}
                    	if(called === "quote"){
                    		console.log("ending in quote")
                    		var url = '/quote?retrieveid='+retrieveid;
                    		console.log(url)
                    		window.location.href = url;
                    	}
                    	if(called === "save"){
                    	var url = '/?retrieveid='+retrieveid+"&alertm=Solution Saved&alertt=success";
                    	window.location.href = url;
                    	////console.log(data.retrieveid)
                    }
                    	
				})
			})
}

function getvalue(data){
	values = []
	////console.log(data)
	for (var i = 0; i < data.length; i++) {
		var element = data[i]
		// //console.log(element)
		var object = {
				id: element.id
		}
		if(typeof element.dataset.label !== "undefined"){
			object.label = element.dataset.label
		}
		if(typeof element.dataset.belong !== "undefined"){
			object.belong = element.dataset.belong
		}
		if(typeof element.dataset.group !== "undefined"){
			object.group = element.dataset.group
		}

		if(element.tagName === "INPUT" && element.value !== null && element.value !== ""){
			object.value = element.value
			if(typeof element.dataset.calculate !== "undefined"){
				object.calculate = element.dataset.calculate
			}
		values.push(object)
		}
		if(element.tagName === "SELECT" && element.value.toString().startsWith("Select") === false){
			object.value = element.options[element.selectedIndex].value
		values.push(object)
		}
		if(element.tagName === "LABEL" && element.value !== null && element.value !== "" && typeof element.dataset.sell !== 'undefined'){
			//console.log("found a LABEL", element)
			object.calculate = element.dataset.calculate
			object.value = element.dataset.sell
		values.push(object)
		}
	}
return(values)
////console.log(values)
}



//retrieve an old quote
function retrievesolution(called,retrieveid){
	console.log("retrieve solution called",called,retrieveid)
if (called === "retrievesolution"){
	var value = document.getElementById('retrievesolution').value;
	savesolution("uid",value);
	window.location.href = "/?retrieveid="+value
}
if (called === "quote"){
	var value = retrieveid
}
if(called === "index"){
	var value = retrieveid
}
//console.log(value)

var data = {retrieveid: value}

 var quoteOptions = {
    method: 'Post',
    headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
};
//quoteOptions.body = infocontainer
//console.log(quoteOptions)
const url = '/solution/retrieve'
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
                    	//console.log(data)
                    	if(called === "index"){
                    		insertinfo(data);
                    	}
                    	if(called === "quote"){
                    		groups(data)
                    	}
				})
			})

function insertinfo(data){
	var infocontainer = document.getElementById('info')
	var nonescaped = data.data.replace(/\+/g, '');
	var updatednodes = []
	//console.log(nonescaped)
	
	var d = document.createElement('div');
		//console.log("d before",d.childNodes)
		d.innerHTML = nonescaped;
		//console.log(d.childNodes)

		for (var a = 0; a < d.childNodes.length; a++) {
			//console.log("looking at",d.childNodes[a].toString())
			////console.log(d.childNodes[a].toString())
			if(d.childNodes[a].toString() !== "[object Text]"){
				//addvalues(data.values,d.childNodes[a])
				//if(called === "retrievesolution"){
					var elements = d.childNodes[a].querySelectorAll('input,select,i,span,button')		
						for (var i = 0; i < elements.length; i++) {
							addeventlistner(elements[i],data.values);
						}
				updatednodes.push(d.childNodes[a])
			//infocontainer.append(d.childNodes[a])
			}	
		}
////console.log(updatednodes)

for (var a = 0; a < updatednodes.length; a++) {
	//console.log(updatednodes[a])
	infocontainer.append(updatednodes[a])
}

}
}
//don't need this anymore
function removeeverything(elements){
	for (var i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i])
	}
}

//don't need this anymore
function transform(element,values){
	//console.log(element)
	if(element.tagName === "INPUT"){
		for (var i = 0; i < values.length; i++) {
			if(element.id.toString() === values[i].id.toString()){
				inputtransform(element,values[i]);
			}
		}
		}
		if(element.tagName === "SELECT"){
			//console.log("found select")
			for (var i = 0; i < values.length; i++) {
				for (var a = 0; a < element.options.length; a++) {
					if(element.options[a].value.toString() === values[i].value.toString()){
						//console.log(element.options[a])
						inputtransform(element,values[i]);
					continue
					}
				}
			}
		}	
}
//don't need this anymore
function inputtransform(element,value){
	//console.log("in inputtransfor",element,element.parent)
	var span = document.createElement("span")
	span.setAttribute('class',"ml-2")
	var spantext = document.createTextNode(value.value)
	span.appendChild(spantext)
	var parent = element.parentNode
	//console.log(parent)
	parent.removeChild(element)
	parent.append(span)
	//console.log(parent)
}

function addvalues(element,values){
	//console.log("in add values",values)
	for (var i = 0; i < values.length; i++) {
		if(element.id.toString() === values[i].id.toString()){
			//console.log("found matching",element,values[i].id)	
				if(element.tagName === "INPUT"){
					element.setAttribute("value",values[i].value)
				}
				
				if(element.tagName === "SELECT"){
					//console.log(element.options)
					for (var a = 0; a < element.options.length; a++) {
						if(element.options[a].value.toString() === values[i].value.toString()){
							//console.log(element.options[a])
							element.selectedIndex = a
						}
					}
				}		
		}
	}

}


function addeventlistner(data,values){
		//console.log("in addEventListener with type",data.tagName)

		if(data.tagName === "INPUT"){
			//data.addEventListener("focusout", function() { calculate(), dependencycheck(), updateval() }, true);
			data.addEventListener("focusout", function() { calculate(), capacitycheck(), dependencycheck() }, true);
			addvalues(data,values)
		}
		if(data.tagName === "SELECT"){
			data.addEventListener("focusout", function() { calculate(), dependencycheck(), updateval() }, true);
			addvalues(data,values)
		}
		if(data.tagName === "I"){
			data.addEventListener("mouseenter", function() { $('[data-toggle="popover"]').popover() }, true);
		}
		if (data.tagName === "BUTTON" ){
			data.addEventListener("click", function(){removerow()}, true)
		}

}

//Create a dismissable alert, inputs are message and type
function alertbox(message,type) {
	//id = event.target.id.toString().split('-')[0];
	//item = idnospace(event.target.id.toString().split('-')[1]);
	var alerts = document.getElementById("alerts");

	//This section builds the message
	var coldiv = document.createElement("div");

	if(type == "danger"){
		coldiv.setAttribute('class', 'alert alert-danger alert-dismissible fade show')	
	}
	if(type === "success"){
		coldiv.setAttribute('class', 'alert alert-success alert-dismissible fade show')
	}
	if(typeof type == "undefined"){
		coldiv.setAttribute('class', 'alert alert-primary alert-dismissible fade show')
	}

	var messagetext = document.createTextNode(message)
	

	var button = document.createElement("button")
	button.setAttribute('class', 'close')
	button.setAttribute('data-dismiss', 'alert')
	button.setAttribute('aria-label', 'Close')
	var spanbutton = document.createElement("span")
	spanbutton.setAttribute('aria-hidden', 'true')
	var spanbuttontext = document.createTextNode("\u00d7")
	spanbutton.appendChild(spanbuttontext)
	button.appendChild(spanbutton)

	coldiv.appendChild(messagetext)
	coldiv.appendChild(button)

	//console.log(coldiv)
	alerts.appendChild(coldiv)
}

