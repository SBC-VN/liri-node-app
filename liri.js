require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');
var axios = require("axios");
var moment = require('moment');

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
            console.log("Unknown instruction.",operation);
            break;
    }   
}

//
//  Function to handle the find the concert command.
//
function findConcert(band) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    if (!band) {
        band = "Ace of Base";
    }

    axios.get(queryUrl).then(
        function(response) {
            if (response.data.length == 0) {
                console.log("No records for your band",band);
                return;
            }
            console.log(" ");
            console.log("------------------------------------------------------------------");
            console.log("Found your band:", band);
            console.log(" ");
            for (var record of response.data) {
                momentDate = moment(record.datetime);
                console.log("Date:" + momentDate.format("MM/DD/YYYY"));
                console.log(" Event Name:" + record.venue.name);
                console.log("   Location:" + record.venue.country);
                console.log(" ");      
            }
        })
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
}

//
//  Function to handle the find the song command.
//
function findSong(song) {    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        var latestTrack = data.tracks.items[0].album;

        var songName = latestTrack.name;
        var releaseDate = latestTrack.release_date;
        var artistName = latestTrack.artists[0].name;
        var image = latestTrack.images[0].url;
        
        console.log(" ");
        console.log("------------------------------------------------------------------");
        console.log("Found your song:");
        console.log(" ");
        console.log("      Artist:",artistName);
        console.log("Artist Image:",image);
        console.log("        Song:",songName);
        console.log("    Released:",releaseDate);
        console.log(" ");
    });
}

//
//  Function to handle the find the song command.
//
function findMovie(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            console.log(" ");
            console.log("------------------------------------------------------------------");
            console.log("Found your movie:");
            console.log(" ");
            console.log("Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating:   " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: "+ response.data.Actors);
            console.log(" ");
        });
}