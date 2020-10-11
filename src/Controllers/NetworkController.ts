import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class NetworkController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/Network";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getNetwork.bind(this));

    }

    private async getNetwork(req: express.Request, res: express.Response) {

        await this.db.models.ArenaTableModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default NetworkController;