import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class ArenaController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/arena";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAllArenas.bind(this));

    }

    private async getAllArenas(req: express.Request, res: express.Response) {

        await this.db.models.ArenaTableModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default ArenaController;