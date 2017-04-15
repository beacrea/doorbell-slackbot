const net = require("net");
const express = require('express');
const app = express();

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
});

PiPlayer.on("error", error => {
  console.error("Got error: " + error.toString());
});

PiPlayer.listen(SERVER_PORT);

app.post('/', function (req, res) {
  res.send('POST request to the homepage', clent);
  delay(() => {
    client.write(FILES.PASS);
  });
});
