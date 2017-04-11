const path = require("path");
const fs = require("fs");
const net = require("net");
const spawn = require('child_process').spawn;

const AUDIO_DIR = path.resolve("./audio");

function Client(host, port) {
  this.host = host;
  this.port = port;
}

Client.prototype = {
  autoConnect() {
    this.connect();
  },

  connect() {
    return new Promise((resolve, reject) => {
      this.connection = net.connect(this.port, this.host);
      this.connection.on("data", buffer => this.playFile(buffer.toString().trim()));
    });
  },

  playFile(fileName) {
    const filePath = AUDIO_DIR + "/" + fileName;

    if(!fs.existsSync(filePath)) {
      console.log("File does not exist: " + filePath);
      return false;
    }

    console.log("Playing! " + filePath);

    // afplay for macs
    // mplayer for linux
    const playerChildProcess = spawn('mplayer', [filePath]);
    playerChildProcess.on("end", () => {
      console.log("Done playing " + filePath);
    });
  }
};

const client = new Client("45.55.33.73", 1234);

client.autoConnect();
