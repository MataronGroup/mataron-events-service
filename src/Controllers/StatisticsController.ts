import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class StatisticsController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/statistics";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/rooms/bases/:eventId`, this.getCounterRoomsPerBase.bind(this));
        this.router.get(`${this.path}/stands/bases/:eventId`, this.getCounterStandsPerBase.bind(this));

    }

    private async getCounterRoomsPerBase(req: express.Request, res: express.Response) {
        this.db.query(`select COUNT(*) as count, Base.BaseID, Base.Name from Rooms, Base WHERE Rooms.EventID = ${req.params.eventId} AND  Rooms.BaseID = Base.BaseID GROUP BY Base.BaseID, Base.Name`)
            .then(r => {
                res.send(r[0]);
            })
    }
    private async getCounterStandsPerBase(req: express.Request, res: express.Response) {
            this.db.query(`select Count(*) as count, b.Name from Stand as s, Rooms as r, Base as b WHERE s.RoomsID = r.RoomsID AND r.EventID = ${req.params.eventId} AND r.BaseID = b.BaseID GROUP BY b.BaseID, b.Name`)
                .then(r => {
                    res.send(r[0]);
                })
    }
}

export default StatisticsController;