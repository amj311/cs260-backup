document.getElementById("city").addEventListener('keyup', function(){
    if( document.getElementById("city").value === "" ) document.getElementById('citiesList').innerHTML = "";
    else {
      let listHTML = "";
      
      let query = this.value.toLowerCase();
      let url = "https://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=P";
      
      fetch(url)
        .then( function(response){
          return response.json();
        })
        .then( function(cities){
          console.log(cities)
          //console.log( cities );
          //for ( city of cities ){
          //    listHTML += `<li onclick="applyTextFrom(this)">${city}</li>`
          //}
          //document.getElementById('citiesList').innerHTML = listHTML;
        })
    }
});

function getCitiesLike(string){
    //console.log(string)
    let matches = [];
    for (city of cities){
        if( city.toLowerCase().indexOf( string.toLowerCase() ) >= 0 ) matches.push(city);
    }
    return matches;
}

function applyTextFrom(el){
    document.getElementById('city').value = el.innerText;
    document.getElementById('citiesList').innerHTML = "";
}




const url = "https://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=P";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            console.log(json[0]);
            console.log("Got " + json[0].city);
            var everything;
            everything = "<ul>";
            for (let i = 0; i < json.length; i++) {
                everything += "<li> " + json[i].city;
            };
            everything += "</ul>";
            document.getElementById("txtHint").innerHTML = everything;
        });