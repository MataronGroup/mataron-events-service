import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import schemas from "../Configuration/JsonSchemas/BaseControllerSchemas";
import {validate} from "express-jsonschema";
import BaseTableController from "../Models/Database/BaseTableController";

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
        this.router.get(`${this.path}/getRoomsByBase/:id`, this.getAllRoomsByBase.bind(this));
        this.router.get(`${this.path}/arena/:id`, this.getBaseByArena.bind(this));
        this.router.put(`${this.path}/:id`, this.updateBase.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteBase.bind(this));
    }

    private async createBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseTableController.create({
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
        await this.db.models.BaseTableController.findByPk(req.params.id)
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

        await this.db.models.BaseTableController.findAll({
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

    private async getAllBasesByEvent(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findAll({
            nest : true,
            include:[{
                model : BaseTableController,
                required : true
            }],
            where: {
                EventID: req.params.id
            }
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
    private async getAllRoomsByBase(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findAll({
            where: {
                BaseID: req.params.id
            }
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async updateBase(req: express.Request, res: express.Response) {
        await this.db.models.BaseTableController.findByPk(req.params.id)
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
        await this.db.models.BaseTableController.destroy({
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