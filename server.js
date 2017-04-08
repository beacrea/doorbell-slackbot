const net = require("net");

const SERVER_PORT = 1234;

const FILES = {
  PASS: "acceptable.mp3",
  FAIL: "unacceptable.mp3"
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
