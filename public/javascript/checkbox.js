//this page is used to update checkboxes with the correct value if selected or not

function updatecheckbox(elementid){
    //get the element and change the value to of or off if it's checked
    let cb = document.getElementById(elementid);
    console.log(cb.checked);

    if(cb.checked === true){
        console.log('checked box ticked')
        cb.setAttribute('value','yes')
    }
    else{
        console.log('checked box unticked')
        cb.setAttribute('value','no')
    }



}