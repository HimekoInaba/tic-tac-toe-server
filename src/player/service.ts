import { IPlayer } from './types';
import { Queue } from 'queue-typescript';
import { Index } from '../game';
import { v4 as uuidv4 } from 'uuid';
import * as WebSocket from 'ws';

export class PlayerService {
    public static getInstance = () => PlayerService.instance;
    private static readonly instance: PlayerService = new PlayerService();

    private readonly sessionMap: Map<string, IPlayer> = new Map();
    private readonly queue: Queue<string> = new Queue();
    private readonly gameMap: Map<string, Index> = new Map();
    private readonly socketMap: Map<string, WebSocket> = new Map();

    public addPlayer(sessionId: string, playerName: string): void {
        this.sessionMap.set(
            sessionId,
            {
                name: playerName,
                sessionId
            }
        );

        this.queue.enqueue(sessionId);
    }

    public makeMove(sessionId: string, gameId: string, x: number, y: number) {
        const game: (Index | undefined) = this.gameMap.get(gameId);
        const socket: (WebSocket | undefined) = this.socketMap.get(sessionId);

        if (game && socket) {
            game.move(sessionId, x, y);
        }
    }

    public addSocket(session: string, socket: WebSocket) {
        this.socketMap.set(session, socket);
        if (this.queue.length >= 2) {
            this.startGame();
        }
    }

    public getSocketBySession(session: string): (WebSocket | undefined){
        return this.socketMap.get(session);
    }

    private startGame() {
        const player1: string = this.queue.dequeue();
        const player2: string = this.queue.dequeue();

        const gameUUID = uuidv4();
        const game: Index = new Index(player1, player2);
        this.gameMap.set(gameUUID, game);

        const p1Socket: (WebSocket | undefined) = this.socketMap.get(player1);
        const p2Socket: (WebSocket | undefined) = this.socketMap.get(player2);

        if (p1Socket) {
            p1Socket.send({ gameId: gameUUID });
        }

        if (p2Socket) {
            p2Socket.send({ gameId: gameUUID });
        }
    }
}
