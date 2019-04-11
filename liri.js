require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

if (process.argv.length > 3) {
    var operation = process.argv[2].toLowerCase();
    var target = process.argv[3].toLowerCase();
}
else {
}

processOperation(operation,target);


//
//  Funtion to process the operation and target.  Calls itself when
//  the operation is the "do what it says" one.
//
function processOperation(operation,target) {
    switch (operation) {
        case "concert-this" :  
            findConcert(target);
            break;

        case "spotify-this-song" :
            findSong(target);
            break;

        case "movie-this" :
            findMovie(target);
            break;

        case "do-what-it-says" :
            const content = fs.readFileSync('./random.txt', 'utf8');
            var parts = content.split(",");
            // Process the command, if it doesn't put us into an infinite loop.
            if (parts[0] != "do-what-it-says") {
                processOperation(parts[0],parts[1]);
            }
            break;
        default:
            console.log("Unknown instruction.");
            break;
    }   
}

//
//  Function to handle the find the concert command.
//
function findConcert(band) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    console.log("band",band);
}

//
//  Function to handle the find the song command.
//
function findSong(song) {
    console.log("song",song);
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("songinfo", data); 
      });
}

//
//  Function to handle the find the song command.
//
function findMovie(movie) {
    console.log("movie",movie);
}