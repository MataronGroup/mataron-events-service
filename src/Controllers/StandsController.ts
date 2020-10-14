import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class StandController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/stand";
        this.router = express.Router();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getStand.bind(this));
        this.router.get(`${this.path}/room/:id`, this.getAllStandsByRoom.bind(this));
        this.router.put(`${this.path}/:id`, this.editStand.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteStand.bind(this));
    }

    private async getStand(req: express.Request, res: express.Response) {
        await this.db.models.StandModel.findByPk(req.params.id).then(async r => {
            if (r) {
               res.send(r);
            } else {
                res.send(new ErrorResponse(`not found stand id ${req.params.id}`))
            }
        });
    }


    private async editStand(req: express.Request, res: express.Response) {
        await this.db.models.StandModel.findByPk(req.params.id).then(async r => {
            if (r) {
                r.update({
                    DayUserID: req.body.soldiers[0].DaySoldier,
                    NightUserID: req.body.soldiers[0].NightSoldier,
                    X: req.body.x,
                    Y: req.body.y,
                    CellName: req.body.cellname
                })

                await this.db.models.StandToNetworksModel.destroy({
                    where: {
                        standID: req.params.id
                    }
                })
                    .then(async deleteResult => {
                        for (const network of req.body.network) {
                            await this.db.models.StandToNetworksModel.create({
                                StandID: req.params.id,
                                NetworksID: network
                            })
                        }
                        res.send({status: "successful"});
                    });
            } else {
                res.send(new ErrorResponse(`not found stand id ${req.params.id}`))
            }
        });
    }

    private async deleteStand(req: express.Request, res: express.Response) {
        await this.db.models.StandToNetworksModel.destroy({
            where: {
                StandID: req.params.id
            }
        })
            .then(async deleteNetworkResult => {
                await this.db.models.StandModel.destroy({
                    where: {
                        StandID: req.params.id
                    }
                })
                    .then(async r => {
                        if (r === 1) {
                            res.send({status: "successful"});
                        } else {
                            res.status(404).send(new ErrorResponse(`cannot find stand id ${req.params.id} in table stands`));
                        }
                    })
                    .catch(e => {
                        res.status(500).send(new ErrorResponse(e.original.message));
                    });

            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }

    private async getAllStandsByRoom(req: express.Request, res: express.Response) {
        await this.db.models.StandModel.findAll({
            where: {
                RoomsID: req.params.id
            }
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }
}

export default StandController;