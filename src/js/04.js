"use strict";

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    console.log("有客户端请求了");
    res.write("hello world\n");
    res.end("see you again");

});

server.listen(3000, () => {
    console.log("server is listening at port 3000");
});