var app = require("express")();
var http = require("http").Server(app);
const fs = require("fs");
const dayjs = require("dayjs");
var io = require("socket.io")(http, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },
   origins: "*:*",
});
var port = process.env.PORT || 3000;

const logfile = "./log.json";

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
   socket.on("chat message", function (msg) {
      fs.readFile(logfile, function (err, buf) {
         const logArray = [
            { date: dayjs().format(), value: msg },
            ...JSON.parse(buf.toString()),
         ];
         fs.writeFileSync(logfile, JSON.stringify(logArray));
      });
      io.emit("chat message", msg);
   });
   socket.on("get logs", function (msg) {
      fs.readFile(logfile, function (err, buf) {
         console.log(buf.toString());
      });
      io.emit("chat message", msg);
   });
});

http.listen(port, function () {
   console.log("listening on *:" + port);
});
