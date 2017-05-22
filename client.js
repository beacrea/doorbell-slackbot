'use strict';

const request = require('request');
const path = require("path");
const fs = require("fs");
const player = require('play-sound')();

const SERVER = {
    HOST: '138.68.2.51',
    PORT: '1234'
};
const AUDIO_DIR = path.resolve("./audio");
const SERVER_FULL = 'http://' + SERVER.HOST + ':' + SERVER.PORT;

let body = [];

// File Playing Function
function playFile(fileName) {
    const filePath = AUDIO_DIR + "/" + fileName;

    if(!fs.existsSync(filePath)) {
        console.log("File does not exist: " + filePath);
        return false;
    }

    // Via http://thisdavej.com/node-js-playing-sounds-to-provide-notifications/
    player.play(filePath, { timeout: 8000 }, function(err){
        if (err) throw err
    });

}

// Make Server Request Every 5 Seconds
setInterval(function(){
    request
        .get(SERVER_FULL)
        .on('data', function(chunk) {
            body.push(chunk);
        })
        .on('end', function() {
            body = Buffer.concat(body).toString();
            console.log('Received response of: ' + body);
            playFile(body);
            body = [];
            // at this point, `body` has the entire request body stored in it as a string
        })
        .on('error', function () {
            console.log('No trigger from server. Retrying in 5 seconds.');
        });
}, 5000);
