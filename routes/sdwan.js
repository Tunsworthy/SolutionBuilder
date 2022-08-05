'use strict';
const axios = require('axios').default;
const util = require('util');

module.exports = {

    getsolution: async function(req){
        console.log(req.query.retrieveid)
        let axiosconfig = {
            method: 'get',
            url: process.env.SolutionsaverAPIURL +'/solution/retrieveid?retrieveid='+req.query.retrieveid,
            headers: { },
        };

        try {
            let response = await axios(axiosconfig);
            console.log(response.status);
            console.log(response.data)
            return(response.data)
        } catch (error) {
            console.error(error);
        };
    },


    groupdata: async function (data){
        /*
        Need to Group parent
        Group Children
        Put Parent details into Child
        */
        var outputarray = []
        var groups = {}
        var toplevel = {}
        //console.log(data)
        var grouplist = [];
        //This is the top level items
        var groupidlist = [];
        var parentidlist = [];
    
        console.log("in Groups")
        var data = data.values
        console.log("Just showing all the data",data)
        for (var i = 0; i < data.length; i++) {
            if(data[i].id.endsWith("addon-qty") === false ){
                //Get top level IDs and create vars for them
                var id = data[i].id.toString().split('-')[0];
                
                //create the first Group
                if(typeof groups[id] === "undefined" && typeof data[i].belong !== "undefined"){
                    groups[id] = []
                    //allocate(data[i])
                    groups[id].push(await allocate(data[i]))
                    groupidlist.push(id)
                continue
                }

                //add data to group if it exists
                if(typeof groups[id] !== "undefined" && typeof data[i].belong !== "undefined"){
                    //console.log(data[i])
                    groups[id][0].details.push(data[i])
                continue
                }


                if(typeof toplevel[id] === "undefined" && typeof data[i].belong === "undefined"){
                    toplevel[id] = []
                    toplevel[id].push(await allocate(data[i]))
                    parentidlist.push(id)
                continue
                }
                
                if(typeof toplevel[id] !== "undefined" && typeof data[i].belong === "undefined"){
                    toplevel[id][0].details.push(data[i])
                continue
                }
            }
        }
    //this loop is used to add the parent details into each of the groups
    console.log(groupidlist.length + " group length")
        for(var i = 0; i < groupidlist.length; i++){
            console.log('in the groups for ' + i)
            console.log(groups[groupidlist[i]])
            console.log(groups[groupidlist[i]][0].belong)
            console.log('top level details ' + toplevel[groups[groupidlist[i]][0].belong][0].details.length)
         //get details from the belong section
         for(var a = 0; a < toplevel[groups[groupidlist[i]][0].belong][0].details.length; a++){
            // console.log(toplevel[groups[groupidlist[i]][0].belong][0].details[a])
            groups[groupidlist[i]][0].details.push(toplevel[groups[groupidlist[i]][0].belong][0].details[a])
         }
        //console.log( groups[groupidlist[i]][0].details.push(toplevel[groups[groupidlist[i]][0].belong][0].details) )
         //groups[groupidlist[i]][0].details.push(toplevel[groups[groupidlist[i]][0].details])
         outputarray.push( groups[groupidlist[i]][0])
        }
    
        //console.log(outputarray)
    console.log("Start of Groups/subproducts")
    console.log(util.inspect(groups, false, 5));
    console.log("Start of toplevel/parents")
    console.log(util.inspect(toplevel, false, 5));
    console.log("Start of outputarray")
    console.log(util.inspect(outputarray, false, 5));
    //console.log(window)
    return(outputarray)
    
    async function allocate(data){
        //If the ID level is definied check to see if product exists
        var name = data.group.toString();
        //if there are no subgroups create one
        //console.log(groups[id])
        //console.log(toplevel[id].length)
            ////console.log("length is 0, creating the product group")
            var product = {
                    name: name,
                    id: id,
                    belong: data.belong,
                    details: [data]

                }   
            ////console.log("showing group",window[id])
        return(product);
    }


    }
}