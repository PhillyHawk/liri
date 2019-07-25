require("dotenv").config();
var axios= require("axios");
var moment= require("moment");
var keys = require("./keys.js");
var Spotify =require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



//bands in town
function getBands(artist){
  var queryUrl= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

axios.get(queryUrl).then(function(response){
  var jsonData=response.data;
  if(!jsonData.length){
    console.log("no results found");

  return;
  }
  for(var i= 0; i<jsonData.length; i++){
    var show=jsonData[i];
    console.log(show.venue.city + " "+ show.venue.region+ " "+ show.venue.name+ " "+moment(show.datetime).format("MM/DD/YYYY") );
  }

})

  
};
getBands("Madonna");

//spotify//
spotify.search({ type: 'track', query: '1979' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 

var song = data.tracks.items[0];
    console.log("------Artists-----");
    for(i=0; i<song.artists.length; i++){
    	console.log(song.artists[i].name);
    }

    console.log("------Song Name-----");
    console.log(song.name);

	console.log("-------Preview Link-----");
    console.log(song.preview_url);

    console.log("-------Album-----");
    console.log(song.album.name);

	});


