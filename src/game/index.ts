import * as WebSocket from 'ws';
import { PlayerService } from '../player/service';

export class Index {
    private readonly service: PlayerService = PlayerService.getInstance();

    private readonly player1: string;
    private readonly player2: string;
    private readonly p1Ws: WebSocket | undefined;
    private readonly p2Ws: WebSocket | undefined;

    private readonly table: number[][];
    private turns: number;

    constructor(player1: string, player2: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.table = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        this.turns = 0;

        this.p1Ws = this.service.getSocketBySession(player1);
        this.p2Ws = this.service.getSocketBySession(player2);
    }

    public move(player: string, x: number, y: number) {
        let type: number;
        switch (player) {
            case this.player1:
                type = -1;
                break;
            case this.player2:
                type = 1;
                break;
            default:
                if (this.p1Ws) {
                    this.p1Ws.send('Error: player: " + player + " not found!');
                }
                return;
        }
        this.turns += 1;
        this.table[x][y] = type;

        if (this.turns > 4) {
            const state: GameState = this.checkState(type);
            this.sendMoveResults(state, x, y);
        }
    }

    private sendMoveResults(state: GameState, x: number, y: number) {
        if (this.p1Ws) {
            this.p1Ws.send({
                player: this.player1,
                x,
                y,
                matrix: this.table,
                state: state
            });
        }

        if (this.p2Ws) {
            this.p2Ws.send({
                player: this.player2,
                x,
                y,
                matrix: this.table,
                state: state
            });
        }
    }

    private checkState(n: number): GameState {
        if (this.table[0][0] === n && this.table[0][1] === n && this.table[0][2] === n) {
            return GameState.WIN;
        } else if (this.table[1][0] === n && this.table[1][1] === n && this.table[1][2] === n) {
            return GameState.WIN;
        } else if (this.table[2][0] === n && this.table[2][1] === n && this.table[2][2] === n) {
            return GameState.WIN;
        } else if (this.table[0][0] === n && this.table[1][0] === n && this.table[2][0] === n) {
            return GameState.WIN;
        } else if (this.table[0][1] === n && this.table[1][1] === n && this.table[2][1] === n) {
            return GameState.WIN;
        } else if (this.table[0][2] === n && this.table[1][2] === n && this.table[2][2] === n) {
            return GameState.WIN;
        } else if (this.table[0][0] === n && this.table[1][1] === n && this.table[2][2] === n) {
            return GameState.WIN;
        } else if (this.table[0][2] === n && this.table[1][1] === n && this.table[2][0] === n) {
            return GameState.WIN;
        } else if (this.turns === 9) {
            return GameState.DRAW;
        }
        return GameState.NONE;
    }
}
