const express = require('express');
const app = express();

const SERVER_PORT = 1234;
let doorBellActive = false;

const FILES = {
  PASS: "meseeks.mp3",
  FAIL: "inception.mp3"
};

app.get('/', function (req, res) {
  if (doorBellActive = true) {
    res.send(FILES.PASS);
  }
});

app.post('/', function (req, res) {
  doorBellActive = true;
  console.log('Doorbell status: ' + doorBellActive);
  res.send("Got your POST request!");
  setTimeout(function() {
    doorBellActive = false;
    console.log('Doorbell status: ' + doorBellActive);
  }, 10000);
});

app.listen(SERVER_PORT, function () {
  console.log('Example app listening on port ' + SERVER_PORT + '!');
  console.log('Doorbell status: ' + doorBellActive + '\n');
});

/*

const net = require("net");

const SERVER_PORT = 1234;

const FILES = {
  PASS: "meseeks.mp3",
  FAIL: "inception.mp3"
};

// Just temporary
function delay(fn) {
  setTimeout(fn, 1000);
}

const PiPlayer = net.createServer(client => {
  console.log("Got new connection from ", client);
  delay(() => {
    client.write(FILES.PASS);
  });
});

PiPlayer.listen(SERVER_PORT);

PiPlayer.on("error", error => {
  console.error("Got error: " + error.toString());
});


*/
