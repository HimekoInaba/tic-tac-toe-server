import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import { ApiRouter } from './routes';
import { PlayerService } from './player/service';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(new ApiRouter().getRouter);

const service: PlayerService = PlayerService.getInstance();

wss.on('connection', (ws: WebSocket) => {
    ws.on('register', (sessionId: string) => {
        service.addSocket(sessionId, ws);
    });

    ws.send('Connected.');
});

server.listen(8999, () => {
    console.log('Server started on port: 8999');
});
