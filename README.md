### Tic-tac-toe game backend

#### Deploy
TODO: dockerize, implement CI/CD
0. install node and npm
1. npm install
2. npm start

#### How to use
0. Default host: localhost:8999
1. POST `/register` (params: name) -> returns sessionId
2. Establish websocket connection
3. Send `register` event with sessionId of current user. You will get game id soon via socket.
4. Send POST `/game/:gameId` with body: 
```
{
    "sessionId": "123sas#$",
    "x": 2,
    "y": 0
}
```
