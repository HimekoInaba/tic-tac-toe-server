import { IPlayer } from './types';

export class PlayerService {
    public static getInstance = () => PlayerService.instance;
    private static readonly instance: PlayerService = new PlayerService();

    private readonly sessionMap: Map<string, IPlayer> = new Map();

    public addPlayer(sessionId: string, playerName: string): void {
        this.sessionMap.set(
            sessionId,
            {
                name: playerName,
                sessionId
            }
        );
    }

    public getPlayer(sessionId: string): IPlayer | undefined {
        return this.sessionMap.get(sessionId);
    }
}
