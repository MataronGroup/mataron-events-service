import express from "express";
import { Controller } from "../Common/Controller";
import { Sequelize } from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class NetworkToStandTemplatesController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/networksToStandTemplates";
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/stand/:id`, this.getAllNetworksByStand.bind(this));
    }

    private async getAllNetworksByStand(req: express.Request, res: express.Response) {

        await this.db.models.NetworkToStandTemplatesModel.findAll({where: {StandID: req.params.id}})
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}



export default NetworkToStandTemplatesController;