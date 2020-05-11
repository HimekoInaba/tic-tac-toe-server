import * as WebSocket from 'ws';

export class Index {
    private readonly player1: string;
    private readonly player2: string;
    private readonly table: number[][];
    private turns: number;

    constructor(player1: string, player2: string) {
        this.player1 = player1;
        this.player2 = player2;
        this.table = [
            [ 0, 0, 0 ],
            [ 0, 0, 0 ],
            [ 0, 0, 0 ]
        ];
        this.turns = 0;
    }

    public move(player: string, x: number, y: number, ws: WebSocket) {
        let type: number;
        switch (player) {
            case this.player1:
                type = -1;
                break;
            case this.player2:
                type = 1;
                break;
            default:
                ws.send('Error: player: " + player + " not found!');
                return;
        }

        this.turns += 1;
        this.table[x][y] = type;

        if (this.turns > 4) {
            const state: GameState = this.checkState(type);
            switch (state) {
                case GameState.WIN:
                    ws.send({
                        player,
                        x,
                        y,
                        matrix: this.table,
                        state: 'WIN'
                    });
                    break;
                case GameState.DRAW:
                    ws.send({
                        player,
                        x,
                        y,
                        matrix: this.table,
                        state: 'DRAW'
                    });
                    break;
                case GameState.NONE:
                    ws.send({
                        player,
                        x,
                        y,
                        matrix: this.table,
                        state: 'IN PROGRESS'
                    });
                    break;
                default:
                    ws.send('Invalid game state');
            }
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
