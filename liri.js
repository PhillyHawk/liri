require("dotenv").config();
var axios= require("axios");
var moment= require("moment");
var keys = require("./keys.js");
var Spotify =require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");





//bands in town
function getBands(value){
  var queryUrl= "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
console.log(queryUrl);
axios.get(queryUrl).then(function(response){
  console.log(response)
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
// getBands();

//spotify//
function spotifyThisSong(songChoice){ 
spotify.search({ type: 'track', query: songChoice }, function(err, data) {
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
}

// getSpotify("1979");
//ombd //

function movieThis(movie) {
  
    var queryUrl = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    axios.get(queryUrl).then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Imdb Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes: " + response.data.Metascore);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("------------------------------------");
    });
  }
// movieThis("Aladin");
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArray = data.split(",");
console.log(data)
    if (dataArray.length === 2) {
      userSwitch(dataArray[0], dataArray[1]);
    } else if (dataArray.length === 1) {
      userSwitch(dataArray[0]);
    }
  });
};

var userSwitch = function(userCommand, userFunction){
  switch (userCommand) {
    case "concert-this":
      getBands(userFunction);
      break;
    case "spotify-this-song":
      spotifyThisSong(userFunction);
      break;
    case "movie-this":
      movieThis(userFunction);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("This is not a valid command, try again");
      console.log("------------------------------------------");
  }
}

var runUserSwitch= function(argOne, argTwo){
  userSwitch(argOne, argTwo);
}
runUserSwitch(process.argv[2], process.argv.slice(3).join(" "))



 

