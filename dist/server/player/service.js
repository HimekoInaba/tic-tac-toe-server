"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerService {
    constructor() {
        this.sessionMap = new Map();
    }
    addPlayer(sessionId, playerName) {
        this.sessionMap.set(sessionId, {
            name: playerName,
            sessionId
        });
    }
    getPlayer(sessionId) {
        return this.sessionMap.get(sessionId);
    }
}
exports.PlayerService = PlayerService;
PlayerService.getInstance = () => PlayerService.instance;
PlayerService.instance = new PlayerService();
//# sourceMappingURL=service.js.map