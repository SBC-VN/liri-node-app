require("dotenv").config();
var keys = require("./keys.js");
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
            fs.readFile('./random.txt', function (err, data) {
                if (err) throw err;
                var parts = data.split(",");

                // Process the command, if it doesn't put us into an infinate loop.
                if (parts[0] != "do-what-it-says") {
                    processOperation(parts[0],parts[1]);
                }
            });
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
function findConcert(song) {
    console.log("song",song);
}

//
//  Function to handle the find the song command.
//
function findMovie(movie) {
    console.log("movie",movie);
}