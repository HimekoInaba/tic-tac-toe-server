import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import { ApiRouter } from './routes';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(new ApiRouter().getRouter);

wss.on('connection', (ws: WebSocket) => {

    // connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        // log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.on('topic/*/subscribe', (topicName: string) => {
        ws.send(`You've been subscribed to ${topicName} topic!`);
    });

    ws.on('topic/*', (topicName: string) => {
        ws.send(`Hi from ${topicName} topic!`);
    });

    // send immediately a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

// start our server
server.listen(8999, () => {
    console.log('Server started on port: 8999');
});
