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

app.post('/', function (req, res) {
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
  res.send('POST request to the homepage')
});
