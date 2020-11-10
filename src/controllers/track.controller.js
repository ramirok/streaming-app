const path = require("path");
const fs = require("fs");

// stream song
const streamTrack = (req, res) => {
  // const track = path.resolve(`public/assets/music/${req.params.track}.mp3`);
  const track = path.resolve(`build/assets/music/${req.params.track}.mp3`);

  res.set("Content-Type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  const filestream = fs.createReadStream(track);
  filestream.on("open", function () {
    const stats = fs.statSync(track);
    const fileSizeInBytes = stats["size"];
    res.writeHead(200, {
      "Content-Length": fileSizeInBytes,
    });
    filestream.pipe(res);
  });
};

module.exports = { streamTrack };
