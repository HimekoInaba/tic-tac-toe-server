import { v4 as uuidv4 } from 'uuid';
import * as express from 'express';
import { PlayerService } from './player/service';

export class ApiRouter {
    private readonly router: express.Router = express.Router();
    private readonly playerService: PlayerService = PlayerService.getInstance();

    constructor() {
        this.assignRoutes();
    }

    public get getRouter(): express.Router {
        return this.router;
    }

    private async assignRoutes(): Promise<void> {
        this.router.post('/register', (req, res) => {
            const sessionId = uuidv4();

            this.playerService.addPlayer(sessionId, req.body.name);
            res.json(sessionId);
        });
    }
}

export default new ApiRouter();
