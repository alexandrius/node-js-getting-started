var app = require("express")();
var http = require("http").Server(app);
// const fs = require("fs");
// const dayjs = require("dayjs");
// var io = require("socket.io")(http, {
//    cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//    },
//    origins: "*:*",
// });
var port = process.env.PORT || 3000;

var cors = require("cors");
app.use(
   cors({
      origin: true,
      credentials: true,
   })
);

const server = app
   .use((req, res) => res.sendFile("/index.html", { root: __dirname }))
   .listen(port, () => console.log(`Listening on ${port}`));
const { Server } = require("ws");

const wss = new Server({ server });

wss.on("connection", (ws) => {
   console.log("Client connected");
   ws.on("close", () => console.log("Client disconnected"));
});
wss.onmessage = (message) => {
   console.log("message", message);
};

// app.get("/", function (req, res) {
//    res.sendFile(__dirname + "/index.html");
// });

// io.on("connection", function (socket) {
//    socket.on("chat message", function (msg) {
//       fs.readFile(logfile, function (err, buf) {
//          const logArray = [
//             { date: dayjs().format(), value: msg },
//             ...JSON.parse(buf.toString()),
//          ];
//          fs.writeFileSync(logfile, JSON.stringify(logArray));
//       });
//       io.emit("chat message", msg);
//    });
//    socket.on("get logs", function (msg) {
//       fs.readFile(logfile, function (err, buf) {
//          console.log(buf.toString());
//       });
//       io.emit("chat message", msg);
//    });

//    socket.on("readHoldingRegisters", function (data) {
//       io.emit("chat message", JSON.stringify(data));
//    });

//    console.log("IO = emit readHolding Registers");
//    io.emit("readHoldingRegisters", {
//       unit: 1,
//       address: 0,
//       length: 10,
//       interval: 1000,
//    });

//    console.log("Socket = emit readHolding Registers");
//    socket.emit("readHoldingRegisters", {
//       unit: 1,
//       address: 0,
//       length: 10,
//       interval: 1000,
//    });
// });

// http.listen(port, function () {
//    console.log("listening on *:" + port);
// });
