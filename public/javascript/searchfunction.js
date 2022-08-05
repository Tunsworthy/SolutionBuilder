function searchfunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("exctable");
  tr = table.getElementsByTagName("tr");

console.log(input)
console.log(filter)
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
  //ignore the headers
  if(tr[i].parentNode.nodeName === "THEAD"){
    continue;
  }
    td = tr[i].getElementsByTagName("td");
    var rfilter = ""
    console.log(td)
      
      for (a = 0; a < td.length; a++) {
        console.log("in loop " + td[a].textContent)
        
        txtValue = td[a].textContent || td[a].innerText;
        console.log(txtValue)
        if (txtValue.toUpperCase().indexOf(filter) > -1){
          rfilter = true
          console.log(filter)
          break;
        }
      }
        
      console.log(rfilter)
        if (rfilter) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
    }
  }