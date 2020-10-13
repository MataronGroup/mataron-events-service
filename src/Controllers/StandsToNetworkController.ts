import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class StandsToNetworkController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/standsToNetwork";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getNetworksByStandId.bind(this))
    }

    private async getNetworksByStandId(req: express.Request, res: express.Response) {
        await this.db.models.StandToNetworksModel.findAll({where: {
                StandID: req.params.id
            }}).then(r => {
                res.send(r);
        }).catch(e => {
            res.send(new ErrorResponse(e));
        })
    }
}

export default StandsToNetworkController;