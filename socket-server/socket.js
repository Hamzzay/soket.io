const port = 8443;
const fs = require("fs");
var options = {
    key: fs.readFileSync("./ssl_certificates/example.key"),
    cert: fs.readFileSync("./ssl_certificates/example.com.chained.crt"),
};
var express = require("express");
var app = express();
app.set("trust proxy", "127.0.0.1");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
var server = require("https").createServer(options, app);
var io = require("socket.io")(server, {
    path: "/socket.io",
    origins: "*:*",
});
server.listen(port);
// var app = require("express")(8008);
// var http = require("http").Server(app);
// var io = require("socket.io")(http, {
//     cors: {
//         origin: ["http://3.215.243.200"],
//     },
// });

app.get("/socket.io", function (req, res) {
    res.send("Socket Working Fine 256.");
});

var sockets = {};

io.on("connection", function (socket) {
    socket.on("message_send", function (data) {
        io.emit("message_receive", {
            message: data.message,
        });
    });
    socket.on("JoinRoomRequest", function (data) {
        io.emit("JoinRoomRequest", {
            data: data,
        });
    });
    socket.on("JoinRoomRequestAccepted", function (data) {
        io.emit("JoinRoomRequestAccepted", {
            data: data,
        });
    });
    socket.on("JoinRoomRequestRejected", function (data) {
        io.emit("JoinRoomRequestRejected", {
            data: data,
        });
    });
    socket.on("BanUserFromRoom", function (data, user) {
        io.emit("BanUserFromRoom", {
            data: data,
            user: user,
        });
    });
    socket.on("AddComment", function (data) {
        io.emit("AddCommentEmit", {
            data: data,
        });
    });
    socket.on("DeleteComment", function (comment_id) {
        io.emit("DeleteComment", {
            comment_id: comment_id,
        });
    });
    socket.on("PostCreated", function (data) {
        io.emit("PostCreated", {
            data: data,
        });
    });
    socket.on("RemovePost", function (data) {
        io.emit("RemovePost", {
            data: data,
        });
    });
    socket.on("LeaveRoom", function (data) {
        io.emit("LeaveRoom", {
            data: data,
        });
    });
    socket.on("ReplyAdded", function (data) {
        io.emit("ReplyAdded", {
            data: data,
        });
    });

    //Podcast
    socket.on("JoinPodcastRequest", function (data) {
        io.emit("JoinPodcastRequest", {
            data: data,
        });
    });
    socket.on("JoinPodcastRequestAccepted", function (data) {
        io.emit("JoinPodcastRequestAccepted", {
            data: data,
        });
    });
    socket.on("JoinPodcastRequestRejected", function (data) {
        io.emit("JoinPodcastRequestRejected", {
            data: data,
        });
    });

    socket.on("UpdateRequestNotifications", function (data) {
        io.emit("UpdateRequestNotifications", {
            data: data,
        });
    });
    socket.on("PodcastCreated", function (data) {
        io.emit("PodcastCreated", {
            data: data,
        });
    });
    socket.on("ClosePodcastAgora", function (data) {
        io.emit("ClosePodcastAgora", {
            data: data,
        });
    });
    socket.on("MemberLeftPodcast", function (data) {
        io.emit("MemberLeftPodcast", {
            data: data,
        });
    });
});

// http.listen(8008, function () {
//     console.log("Socket Working Fine..");
// });
