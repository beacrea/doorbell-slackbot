'use strict';

const request = require('request');
const exec = require('child_process').exec;
const path = require("path");
const fs = require("fs");

const SERVER = {
  HOST: '45.55.33.73',
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

  console.log("Playing! " + filePath);

  // afplay for macs
  // mplayer for linux
  exec('mplayer ' + filePath, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
  });
}

// Make Server Request Every 5 Seconds
setInterval(function(){
  request
    .get(SERVER_FULL)
    .on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      console.log('Received response of: ' + body);
      playFile(body);
      body = [];
      // at this point, `body` has the entire request body stored in it as a string
    });
}, 5000);
