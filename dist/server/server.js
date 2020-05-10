"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(new routes_1.ApiRouter().getRouter);
wss.on('connection', (ws) => {
    // connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        // log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    ws.on('topic/*/subscribe', (topicName) => {
        ws.send(`You've been subscribed to ${topicName} topic!`);
    });
    ws.on('topic/*', (topicName) => {
        ws.send(`Hi from ${topicName} topic!`);
    });
    // send immediately a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
// start our server
server.listen(8999, () => {
    console.log('Server started on port: 8999');
});
//# sourceMappingURL=server.js.map