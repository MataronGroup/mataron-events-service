import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class JobsController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/jobs";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getJobs.bind(this));
    }

    private async getJobs(req: express.Request, res: express.Response) {
        await this.db.models.JobsTableModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default JobsController;