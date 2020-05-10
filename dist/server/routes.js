"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express = require("express");
const service_1 = require("./player/service");
class ApiRouter {
    constructor() {
        this.router = express.Router();
        this.playerService = service_1.PlayerService.getInstance();
        this.assignRoutes();
    }
    get getRouter() {
        return this.router;
    }
    assignRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.post('/register', (req, res) => {
                const sessionId = uuid_1.v4();
                this.playerService.addPlayer(sessionId, req.body.name);
                res.sendStatus(200);
                res.json(sessionId);
            });
        });
    }
}
exports.ApiRouter = ApiRouter;
exports.default = new ApiRouter();
//# sourceMappingURL=routes.js.map