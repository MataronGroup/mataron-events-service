import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import schemas from "../Configuration/JsonSchemas/BaseControllerSchemas";
import {validate} from "express-jsonschema";

class BaseController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/base";
        this.router = express.Router();
        this.schema = schemas.basicBody;

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validate({body: this.schema}), this.createBase.bind(this));
        this.router.get(`${this.path}/:id`, this.getBase.bind(this));
        this.router.get(`${this.path}/getAllBasesByEvent/:id`, this.getAllBasesByEvent.bind(this));
        this.router.get(`${this.path}/event/:eventId/base/:baseId/soliders`, this.getAllSolidersInBase.bind(this));
        this.router.get(`${this.path}/arena/:id`, this.getBaseByArena.bind(this));
        this.router.put(`${this.path}/:id`, this.updateBase.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteBase.bind(this));
    }

    private async createBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseModel.create({
            Name: req.body.Name,
            ArenaID: req.body.ArenaID
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async getBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseModel.findByPk(req.params.id)
            .then(r => {
                if (r) {
                    res.send(r);
                } else {
                    res.status(404).send(new ErrorResponse(`cannot find base id ${req.params.id}`))
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async getBaseByArena(req: express.Request, res: express.Response) {
        await this.db.models.BaseModel.findAll({

            where: {
                ArenaID: req.params.id
            }
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async getAllSolidersInBase(req: express.Request, res: express.Response) {
        try {
            const solidersInNight : any = await this.db.query(`
            select b.Name , Count(*) as solidersCount
            from Base as b
            join Rooms as r on (b.BaseID = r.BaseID)
            join Stand as s on (s.RoomsID = r.RoomsID)
            join Users as u on (u.PersonalID = s.NightUserID)
            where r.EventID = ${req.params.eventId} and b.BaseID = ${req.params.baseId} and s.NightUserID != s.DayUserID
            group by b.Name`,{nest: true})
            const solidersDay : any= await this.db.query(`
                select b.Name , Count(*) as solidersCount from Base as b
                join Rooms as r on (b.BaseID = r.BaseID)
                join Stand as s on (s.RoomsID = r.RoomsID)
                join Users as u on (u.PersonalID = s.DayUserID)
                where r.EventID = ${req.params.eventId} and b.BaseId = ${req.params.baseId} and s.NightUserID != s.DayUserID
                group by b.Name`, {nest: true})

            const countNight : number =solidersInNight[0].solidersCount as number;
            const countDay : number = solidersDay[0].solidersCount as number;
            res.send({baseName : solidersDay[0].Name , count : countNight + countDay })
        }
        catch (err){
            res.status(500).send(new ErrorResponse(err.message));
        }
    }
    private async getAllBasesByEvent(req: express.Request, res: express.Response) {
            await this.db.query(`select b.Name ,b.BaseID ,r.EventID  from Base as b
            join Rooms as r on (b.BaseID = r.BaseID)
            where r.EventID = ${req.params.id}
            group by b.Name , b.BaseID , r.EventID`,{nest: true})
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
    private async updateBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseModel.findByPk(req.params.id)
            .then(r => {
                if (r) {
                    r.update({
                        Name: req.body.Name,
                        ArenaID: req.body.ArenaID
                    })
                        .then(updateResult => {
                            res.send(updateResult);
                        })
                        .catch(e => {
                            res.status(500).send(new ErrorResponse(e.original.message));
                        });
                } else {
                    res.status(404).send(new ErrorResponse(`cannot find base id ${req.params.id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async deleteBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseModel.destroy({
            where: {
                BaseID: req.params.id
            }
        })
            .then(r => {
                if (r === 1) {
                    res.send({status: "successful"});
                } else {
                    res.status(404).send(new ErrorResponse(`cannot find base id ${req.params.id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }
}

export default BaseController;