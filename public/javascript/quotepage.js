var grouplist = [];
//This is the top level items
var idlist = [];
async function groups(data){
	console.log("in Groups")
	var data = data.values
	console.log("Just showing all the data",data)
	for (var i = 0; i < data.length; i++) {
	console.log(data[i].id.endsWith("addon-qty"))
		if(typeof data[i].belong === "undefined" && data[i].id.endsWith("addon-qty") === false ){
			//Get top level IDs and create vars for them
			var id = data[i].id.toString().split('-')[0];
			if(typeof window[id] === "undefined"){
				window[id] = []
				//console.log("Created "+ id,window[id])
				idlist.push(id)
			}

			//If the ID level is definied check to see if product exists
			var name = data[i].group.toString();
			//if there are no subgroups create one
			//console.log(window[id].length)
			if(window[id].length == 0){
				////console.log("length is 0, creating the product group")
				var product = {
						name: name,
						details: [data[i]]
					}
				window[id].push(product)
				////console.log("showing group",window[id])
				continue
			}
			if(window[id].length >= 1){
				////console.log("length is 1, creating the product group")
				//go through the list and find a matcing group to the currnet name
				for (var a = 0; a < window[id].length; a++) {
					////console.log("looking at group",window[id][a].name,name)
					//If the Gorup is not definied make it and push in the data
					if(window[id][a].name.toString() !== name){
						////console.log("didn't find with product",name)
						var product = {
						name: name,
						details: [data[i]]
						}
					window[id].push(product)
					////console.log("showing group",window[id])
				}
					//if the group is a match only push the data
				if(window[id][a].name.toString() === name){
					////console.log("found a groupd that matches",name)
					window[id][a].details.push(data[i])
				}

			}	
		}
	}
	//if belong has something add data to the ID group
	if(typeof data[i].belong !== "undefined"){
		////console.log("found data that belongs to another ID",data[i].group)
		var name = data[i].group.toString();
		var matcing = null
		var matched = null
		//window[data[i].belong]
		if(window[id].length >= 1){
			////console.log("length is 1, creating the product group")
			//go through the list and find a matcing group to the currnet name
			for (var a = 0; a < window[id].length; a++) {
				if(window[id][a].name.toString() !== name){
					var matching = false
				}
				if(window[id][a].name.toString() === name){
					var matching = true
					var matched = a
				}
			////console.log('matching' + window[id][a].name.toString() +' to '+ name+' result '+ matching)
			}
			
			if(!matching){
				////console.log("didn't find with product",name)
					var product = {
					name: name,
					details: [data[i]]
					}
				window[id].push(product)
			}
			if(matching){
				window[id][matched].details.push(data[i])
			}
			
		}
	}

}
	await descriptionrow()

	for (var i = 0; i < idlist.length; i++) {
		//console.log("looking at",idlist[i])
		////console.log(window[PVDNQ])
		//console.log("showing Window",window[idlist[i]])
		//console.log("sending to formatter")
		await formatchooser(window[idlist[i]]);
	}	
footerrow()

}

var totalmonthly = []
var totalupfront = []

async function descriptionrow(){
	var infocontainer = document.getElementById('info');
	let row = createrow()


	var producttextspan = document.createElement('span')
	var producttext = document.createTextNode("Product Name")

	producttextspan.append(producttext)
	row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("Product Details")
	textspan.append(producttext)
	textspan.innerHTML += "<br>"
	row.querySelectorAll('[id*=colproductdetails')[0].append(textspan)

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("Setup Price")
	textspan.append(producttext)
	row.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
	infocontainer.append(row)

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("Monthly Price")
	textspan.append(producttext)
	row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
	infocontainer.append(row);
	return('done')
}


function footerrow(){

	var totalsnumber = totalmonthly.reduce(getSum,0);
	var upfrontnumber = totalupfront.reduce(getSum,0);

	var infocontainer = document.getElementById('info');
	let row = createrow(true)

	row.querySelectorAll('[id*=colproductname')[0].setAttribute('class', 'col-3 order-first mt-2')
	row.querySelectorAll('[id*=colproductdetails')[0].setAttribute('class', 'col-3 order-1 mt-2')

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("Total Upfront Price")
	textspan.append(producttext)
	textspan.innerHTML += "<br>"
	row.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
	row.querySelectorAll('[id*=colproductsetuptotal')[0].setAttribute("class","col col-3 order-2 mt-2 text-right")
	infocontainer.append(row)

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("Total Monthly Price")
	textspan.append(producttext)
	row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
	row.querySelectorAll('[id*=colproducttotal')[0].setAttribute("class","col col-3 order-last mt-2 text-right")
	infocontainer.append(row)

	let row2 = createrow(true)

	row2.querySelectorAll('[id*=colproductname')[0].setAttribute('class', 'col-3 order-first')
	row2.querySelectorAll('[id*=colproductdetails')[0].setAttribute('class', 'col-3 order-1')

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("$"+Number(upfrontnumber).toFixed(2))
	textspan.append(producttext)
	textspan.innerHTML += "<br>"
	row2.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
	//colproductsetuptotal.setAttribute('class', 'col col-lg-2 order-2')
	row2.querySelectorAll('[id*=colproductsetuptotal')[0].setAttribute("class","border-bottom border-top col col-3 order-2 text-right")
	//border-bottom border-top
	infocontainer.append(row2)

	var textspan = document.createElement('span')
	var producttext = document.createTextNode("$"+Number(totalsnumber).toFixed(2))
	textspan.append(producttext)
	textspan.innerHTML += "<br>"
	row2.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
	//colproducttotal.setAttribute('class', 'col col-lg-2 order-last border-bottom border-top')
	row2.querySelectorAll('[id*=colproducttotal')[0].setAttribute("class","border-bottom border-top col col-3 order-last text-right")
	infocontainer.append(row2)


}

async function formatchooser(data){
	
	var formatted = []
	//console.log("looking at format for", data)
	var infocontainer = document.getElementById('info');
	
	//infocontainer.append(descriptionrow())
		let row;
		var location;
	for (var i = 0; i < data.length; i++) {
		//create the formate for each <Productname> - <Product details> - <Totals>
		console.log("in data for",data[i].name)
		//change name to uppercase
		let name = data[i].name.toString().toUpperCase();
		row = await createrow();
		
		//learnt to user some swtiches
		switch(name){
			case "IAAS":
				infocontainer.append(formatiaas(data[i],row));
				location = await getlocation(data[i]);
				break;
			case "CLOUD GATEWAY":
			case "CLOUD INTERNET":
				infocontainer.append(formatecloudgateway(data[i],row,location));
				break;
			case "FWAAS":
				infocontainer.append(formatfwaas(data[i],row,location));
				location = await getlocation(data[i])
				break;
			case "ADDITONAL IPS":
				infocontainer.append(formatadditonalips(data[i],row,location));
				break;
			case "CLOUD BACKUP FOR VEEAM":
				infocontainer.append(formatVeeamCloudConnect(data[i],row));
				break;
			case "ALL SOFTWARE":
				infocontainer.append(formatallsoftware(data,row))
				break;
			case "BACKUPFORIAAS":
				BackupforIaaS(data[i],infocontainer,location)
			default:
				console.log("Didn't find anything")

		};
	}
return('done')
/*

		if(data[i].name.toString() === "IaaS"){
			//console.log("found IaaS, sending to format")
			var row = createrow()
			infocontainer.append(formatiaas(data[i],row));
			var location = getlocation(data[i]);
			continue
		}
		if(data[i].name.toString() === "Cloud Gateway"){
			var row = createrow()
			infocontainer.append(formatecloudgateway(data[i],row,location));
			continue
		}

		if(data[i].name.toString() === "BackupforIaaS" || data[i].name.toString() === "Internet"){
			var name = data[i].name.toString()
			var items = data[i].details
			let idlist = []
			for (var a = 0; a < items.length; a++) {
				idlist.push(items[a].id.toString().split('-')[0])
			}
			var unique = idlist.filter( onlyUnique );
			//console.log(unique)
			
			for (var a = 0; a < unique.length; a++) {
				window[unique[a].toString()] = []
			}

			for (var a = 0; a < items.length; a++) {
				let id = items[a].id.toString().split('-')[0]
				window[id].push(items[a])
			}
			//console.log(unique)
			for (var a = 0; a < unique.length; a++) {
				//console.log(window[unique[a].toString()])
				var row = createrow()
				if(name.toString() === "BackupforIaaS"){
					infocontainer.append(formatbackupforiaaS(name,window[unique[a].toString()],row,location));
				}
				if(name.toString() === "Internet"){
					//console.log(window[unique[a].toString()])
					infocontainer.append(formatecloudgateway(window[unique[a].toString()],row,location,name));
				}
			}
			continue
		}
		if(data[i].name.toString() === "FWaaS"){
			var row = createrow()
			var location = getlocation(data[i]);
			infocontainer.append(formatfwaas(data[i],row,location));
			continue
		}
		if(data[i].name.toString() === "Additonal IPs"){
			var row = createrow()
			infocontainer.append(formatadditonalips(data[i],row,location));
			continue
		} 
		if(data[i].name.toString() === "Cloud Backup for Veeam"){
			var row = createrow()
			infocontainer.append(formatVeeamCloudConnect(data[i],row));
			continue
		}
		if(data[i].name.toString() === "All Software"){
			var row = createrow()
			infocontainer.append(formatallsoftware(data,row))
			continue
		}
	}

////console.log(formatted)
//infocontainer.append(formatted)
*/
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function BackupforIaaS(data,infocontainer,location){
	var items = data.details
			let idlist = []
			for (var a = 0; a < items.length; a++) {
				idlist.push(items[a].id.toString().split('-')[0])
			}
			var unique = idlist.filter( onlyUnique );
			//console.log(unique)
			
			for (var a = 0; a < unique.length; a++) {
				window[unique[a].toString()] = []
			}

			for (var a = 0; a < items.length; a++) {
				let id = items[a].id.toString().split('-')[0]
				window[id].push(items[a])
			}
			//console.log(unique)
			for (var a = 0; a < unique.length; a++) {
				//console.log(window[unique[a].toString()])
			var row = createrow()
				infocontainer.append(formatbackupforiaaS(data.name.toString(),window[unique[a].toString()],row,location));
			}	
}



function createrow(borderoff){
		var infocontainer = document.getElementById('info');
		let row = document.createElement('div')
		if(!borderoff){
		row.setAttribute('class', 'row border-bottom border-top')
		}
		if(borderoff){
			row.setAttribute('class', 'row')
		}	
		var colproductname = document.createElement('div')
		colproductname.setAttribute('class', 'col-3 order-first')
		colproductname.setAttribute('id', 'colproductname')
		row.append(colproductname)

		var colproductdetails = document.createElement('div')
		colproductdetails.setAttribute('class', 'col-5 order-1')
		colproductdetails.setAttribute('id', 'colproductdetails')
		row.append(colproductdetails)

		var colproductsetuptotal = document.createElement('div')
		colproductsetuptotal.setAttribute('class', 'col col-2 order-2')
		colproductsetuptotal.setAttribute('id', 'colproductsetuptotal')
		row.append(colproductsetuptotal)	


		var colproducttotal = document.createElement('div')
		colproducttotal.setAttribute('class', 'col col-2 order-last')
		colproducttotal.setAttribute('id', 'colproducttotal')
		row.append(colproducttotal)	
	return(row)
}

// usage example:
//var a = ['a', 1, 'a', 2, '1'];
//var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']

/*
name: "IaaS"
details: Array (6)
0 {id: "PVDNQ-PoD", label: "PoD", group: "IaaS", value: "NSW"}
1 {id: "PVDNQ-No.ofVMs", label: "No. of VMs", group: "IaaS", value: "1"}
2 {id: "PVDNQ-vCPU", label: "vCPU", group: "IaaS", value: "2", calculate: "self"}
3 {id: "PVDNQ-RAM(GB)", label: "RAM (GB)", group: "IaaS", value: "3", calculate: "self"}
4 {id: "PVDNQ-Storage(GB)", label: "Storage (GB)", group: "IaaS", value: "4", calculate: "self"}
5 {id: "PVDNQ-Total", label: "Total", group: "IaaS", value: "79.00"}
*/

//Format IaaS
function formatiaas(data,row){
	//console.log("Formatting IaaS",data)
	//IaaS is grouped by POD (location) 
	//IaaS - <location> | <componants> - <qunt> | <Total>
	

	var items = data.details
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]
		var textspan = document.createElement('span')
		if(id === "PoD"){

			var producttextspan = document.createElement('span')
			var producttext = document.createTextNode(data.name +"-"+ items[i].value)

			producttextspan.append(producttext)
			row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)
		}

		if(id === "vCPU"){
			//var textspan = document.createElement('span')
			var producttext = document.createTextNode(items[i].label+"-"+items[i].value)
			textspan.append(producttext)
			textspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(textspan)
		}
		if(id === "RAM(GB)"){
			//var textspan = document.createElement('span')
			var producttext = document.createTextNode(items[i].label+"-"+items[i].value)
			textspan.append(producttext)
			textspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(textspan)
		}
		if(id === "Storage(GB)"){
			//var textspan = document.createElement('span')
			var producttext = document.createTextNode(items[i].label+"-"+items[i].value)
			textspan.append(producttext)
			textspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(textspan)
		}
		//Upfront
		if(id === "Upfront"){
			//var textspan = document.createElement('span')
			totalupfront.push(items[i].value)
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
		}

		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			//var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}

	}
//console.log(row)
return(row)
}

/*
details: Array (3)
0 {id: "FCSIC-Term", label: "Term", belong: "PVDNQ", group: "Cloud Gateway", value: "1"}
1 {id: "FCSIC-Mbps(speed)", label: "Mbps (speed)", belong: "PVDNQ", group: "Cloud Gateway", value: "20"}
2 {id: "FCSIC-Total", label: "Total", belong: "PVDNQ", group: "Cloud Gateway", value: "155.00"}
Array Prototype
name: "Cloud Gateway"

//IaaS is grouped by POD (location) 
//Cloud Gateway - <location> | <componants> - <qunt> | <Total>

*/
function formatecloudgateway(data,row,location,name){
	//console.log("Formatting CloudGateway",data)

	var productnamespan = document.createElement('span')
	if(name){
		var items = data
		var productnamespantext = document.createTextNode(name+"-"+location)
	}
	else{
	var productnamespantext = document.createTextNode(data.name+"-"+location)	
	var items = data.details}

	productnamespan.append(productnamespantext)
	row.querySelectorAll('[id*=colproductname')[0].append(productnamespan)
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]

		//add Spped
		if(id === "Mbps(speed)"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}
		//Upfront
		if(id === "Upfront"){
			var textspan = document.createElement('span')
			totalupfront.push(items[i].value)
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			textspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
		}
		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			textspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}

	}
//console.log(row)
return(row)
}


/*
0 {id: "SBICI-Storage(GB)-remaining", label: "Storage (GB)", belong: "PVDNQ", group: "BackupforIaaS", value: "-28", …}
1 {id: "SBICI-No.ofVMs-remaining", label: "No. of VMs", belong: "PVDNQ", group: "BackupforIaaS", value: "-33", …}
2 {id: "SBICI-Policy", label: "Policy", belong: "PVDNQ", group: "BackupforIaaS", value: "31 Daily"}
3 {id: "SBICI-StorageFE(GB)", label: "Storage FE (GB)", belong: "PVDNQ", group: "BackupforIaaS", value: "32", …}
4 {id: "SBICI-No.ofVMs", label: "No. of VMs", belong: "PVDNQ", group: "BackupforIaaS", value: "34", …}
5 {id: "SBICI-Total", label: "Total", belong: "PVDNQ", group: "BackupforIaaS", value: "342.24"}
Array Prototype
name: "BackupforIaaS"
*/
function formatbackupforiaaS(name,data,row,location){
	//console.log("Formatting BackupforIaaS",data)
	
	var items = data
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]
		if(typeof items[i].id.toString().split('-')[2] !== "undefined"){continue}
		//Backup for IaaS is grouped by Policy
		if(id === "Policy"){
			var producttextspan = document.createElement('span')
			var producttext = document.createTextNode(name+"-"+location+"-"+items[i].value)

			producttextspan.append(producttext)
			row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)
		}

		//add No.ofVMS
		if(id === "No.ofVMs"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}
		//add No.ofVMS
		if(id === "StorageFE(GB)"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}

		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}

	}
//console.log(row)
return(row)
}


/*
name: "FWaaS"
details: Array (8)
0 {id: "GCEIY-PoD", label: "PoD", belong: "PVDNQ", group: "FWaaS", value: "NSW"}
1 {id: "GCEIY-ProvisioningType", label: "Provisioning Type", belong: "PVDNQ", group: "FWaaS", value: "Standard"}
2 {id: "GCEIY-ManagedServices", label: "Managed Services", belong: "PVDNQ", group: "FWaaS", value: "Yes"}
3 {id: "GCEIY-HighAvailability", label: "High Availability", belong: "PVDNQ", group: "FWaaS", value: "Yes"}
4 {id: "GCEIY-FireWallType", label: "FireWall Type", belong: "PVDNQ", group: "FWaaS", value: "Standard"}
5 {id: "GCEIY-Mbps(speed)", label: "Mbps (speed)", belong: "PVDNQ", group: "FWaaS", value: "10"}
6 {id: "GCEIY-internet", label: "internet", belong: "PVDNQ", group: "FWaaS", value: "150", …}
7 {id: "GCEIY-Total", label: "Total", belong: "PVDNQ", group: "FWaaS", value: "851.15"}
*/
function formatfwaas(data,row,location){
	//console.log("Formatting FWaaS",data)
		
	var items = data.details
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]
		if(id === "PoD"){

			var producttextspan = document.createElement('span')
			var producttext = document.createTextNode(data.name +"-"+ items[i].value)

			producttextspan.append(producttext)
			row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)
		}
		//add ProvisioningType
		if(id === "ProvisioningType" || id === "ManagedServices" || id === "FireWallType" || id === "Mbps(speed)"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}

		//Upfront
		if(id === "Upfront"){
			totalupfront.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproductsetuptotal')[0].append(textspan)
		}

		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}

	}
//console.log(row)
return(row)
}

/*
details: Array (2)
0 {id: "OUSBO-No.ofIPs", label: "No. of IPs", belong: "JBTJK", group: "Additonal IPs", value: "2"}
1 {id: "OUSBO-Total", label: "Total", belong: "JBTJK", group: "Additonal IPs", value: "15.00"}
name: "Additonal IPs"
*/
function formatadditonalips(data,row,location){
	//console.log("Formatting AdditonalIPs",data,location)
	
	var productnamespan = document.createElement('span')
	var productnamespantext = document.createTextNode(data.name+"-"+location)	
	productnamespan.append(productnamespantext)
	row.querySelectorAll('[id*=colproductname')[0].append(productnamespan)

	var items = data.details
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]
		if(typeof items[i].id.toString().split('-')[2] !== "undefined"){continue}
		////console.log(id)
		//add No.ofVMS
		if(id === "No.ofIPs"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}
		
		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}

	}
//console.log(row)
return(row)

}


/*details: Array (3)
0 {id: "RQRBS-Storage(GB)", label: "Storage (GB)", group: "Veeam Cloud Connect", value: "1", calculate: "self"}
1 {id: "RQRBS-No.ofVMs", label: "No. of VMs", group: "Veeam Cloud Connect", value: "1", calculate: "self"}
2 {id: "RQRBS-Total", label: "Total", group: "Veeam Cloud Connect", value: "10.09"}

Array Prototype

name: "Veeam Cloud Connect"
*/

function formatVeeamCloudConnect(data,row){
//console.log("Formatting Veeam Cloud Connect",data)
	
	var items = data.details
	for (var i = 0; i < items.length; i++) {
		id = items[i].id.toString().split('-')[1]

		//var textspan = document.createElement('span')
		if(id === "PoD"){
			var producttextspan = document.createElement('span')
			var producttext = document.createTextNode(data.name +"-"+ items[i].value)

			producttextspan.append(producttext)
			row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)
		}

		if(id === "Storage(GB)" || id === "No.ofVMs"){
			var productdetailspan = document.createElement('span')
			var productdetailspantext = document.createTextNode(items[i].label+"-"+items[i].value)
			productdetailspan.append(productdetailspantext)
			productdetailspan.innerHTML += "<br>"
			row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
		}

		if(id === "MonthlyTotal"){
			totalmonthly.push(items[i].value)
			var textspan = document.createElement('span')
			var producttext = document.createTextNode("$"+items[i].value)
			textspan.append(producttext)
			row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
		}



	}	
//console.log(row)
return(row)
}

/*
{name: "All Software", details: Array}
1 {name: "SQL Server Standard", details: Array}
2 {name: "SQL Server Enterprise", details: Array}

Array (3)
0 Object
name: "All Software3"
Object Prototype
1 Object

details: Array (3)
0 {id: "PSGCS-No.ofLicences", label: "No. of Licences", belong: "BCRTX", group: "SQL Server Standard", value: "1", …}
1 {id: "PSGCS-MonthlyTotal", label: "Monthly Total", belong: "BCRTX", group: "SQL Server Standard", value: "257.40"}
2 {id: "PSGCS-Upfront", label: "Upfront", belong: "BCRTX", group: "SQL Server Standard", value: "0.00"}

Array Prototype

name: "SQL Server Standard"

Object Prototype
2 Object

details: Array (3)
0 {id: "TOKQK-No.ofLicences", label: "No. of Licences", belong: "BCRTX", group: "SQL Server Enterprise", value: "1", …}
1 {id: "TOKQK-MonthlyTotal", label: "Monthly Total", belong: "BCRTX", group: "SQL Server Enterprise", value: "1052.30"}
2 {id: "TOKQK-Upfront", label: "Upfront", belong: "BCRTX", group: "SQL Server Enterprise", value: "0.00"}
Array Prototype
name: "SQL Server Enterprise"
*/
function formatallsoftware(data,row){
	//console.log("Formatting All Software",data)

	var items = data
	//console.log(items)
	for (var i = 0; i < items.length; i++) {
		//id = items[i].id.toString().split('-')[1]
		//if(typeof items[i].id.toString().split('-')[2] !== "undefined"){continue}
		if(items[i].name.toString() === "All Software"){
			var producttextspan = document.createElement('span')
			var producttext = document.createTextNode(items[i].name)

			producttextspan.append(producttext)
			row.querySelectorAll('[id*=colproductname')[0].append(producttextspan)
		continue
		}
		else{
			for (var a = 0; a < items[i].details.length; a++) {
				var detail = items[i].details[a]
				//console.log(detail)
				var detailid = detail.id.toString().split('-')[1]
				//add No.ofVMS
				if(detailid === "No.ofLicences"){
					var productdetailspan = document.createElement('span')
					var productdetailspantext = document.createTextNode(items[i].name+"-"+detail.value)
					productdetailspan.append(productdetailspantext)
					productdetailspan.innerHTML += "<br>"
					row.querySelectorAll('[id*=colproductdetails')[0].append(productdetailspan)
				}
				if(detailid === "MonthlyTotal"){
					//console.log(detail.value)
					totalmonthly.push(detail.value)
					var textspan = document.createElement('span')
					var producttext = document.createTextNode("$"+detail.value)
					textspan.append(producttext)
					textspan.innerHTML += "<br>"
					row.querySelectorAll('[id*=colproducttotal')[0].append(textspan)
				}
			}


		}

	}
//console.log(row)
return(row)
}






//get the location from IaaS or FWAAS
function getlocation(data){
	console.log("in getlocation",data)
	if(data.name === "IaaS" || data.name === "FWaaS"){
		var details = data.details
		for (var i = 0; i < details.length; i++) {
			id = details[i].id.toString().split('-')[1]
			console.log(details[i].name)
			if(id === "PoD"){
				console.log(details[i].value)
				return(details[i].value)
			}
		}
	}

}

/*
ID
	-no Belong Group
	-Belong
		-Group


*/