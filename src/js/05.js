"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer();

server.on("request", (req, res) => {

    fs.readFile(path.join(__dirname, "04.fffjs"), (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    })
});

server.listen("3000", () => {
    console.log("server is runnig");
});