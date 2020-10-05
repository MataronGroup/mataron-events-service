import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import RoomsTableModel from "../Models/Database/RoomsTableModel";
import {validate} from "express-jsonschema";


class RoomsController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/rooms";
        this.router = express.Router();
        this.schema = this.initializeSchema();

        this.initializeRoutes();
    }

    private initializeSchema() {
        return ({
            type: 'object',
            properties: {
                Name: {
                    type: 'string',
                    required: true
                },
                Base: {
                    type: 'number',
                    required: true
                }
            }
        });
    }

    private initializeRoutes() {
        this.router.post(this.path, validate({body: this.schema}), this.createRoom.bind(this));
        this.router.get(`${this.path}/:id`, this.getRoom.bind(this));
        this.router.put(`${this.path}/:id`, this.updateRoom.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteRoom.bind(this));
    }

    private async createRoom(req: express.Request, res: express.Response) {

        await this.db.models.RoomsTableModel.create({
            Name: req.body.Name,
            BaseID: req.body.Base
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(e.original.message);
            });
    }

    // tslint:disable-next-line:no-empty
    private async getRoom(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findByPk(req.params.id)
            .then(r => {
               if(r) {
                   res.send(r);
               }
               else {
                   res.status(404).send(`cannot find room id ${req.params.id}`)
               }
            })
            .catch(e => {
                res.status(500).send(e.original.message);
            });
    }

    // tslint:disable-next-line:no-empty
    private async updateRoom(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findByPk(req.params.id)
            .then(async r => {
                if(r)
                {
                    r.update({
                        Name: req.body.Name,
                        Base: req.body.Base
                    }, {
                        where: {
                            RoomsID: req.params.id
                        }
                    })
                        .then(r2 => {
                            res.send({status: "successful"});
                        })
                        .catch(e => {
                           res.status(500).send("error");
                        });
                }
                else {
                    res.status(404).send(`cannot find room id ${req.params.id}`)
                }
            })
    }

    private async deleteRoom(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.destroy({
            where: {
                RoomsID: req.params.id
            }
        })
            .then(r => {
                if(r === 1)
                {
                    res.send({status: "successful"});
                }
                else {
                    res.status(404).send(`cannot find room id ${req.params.id}`)
                }
            })
            .catch(e => {
                res.status(500).send("error");
            });
    }
}

export default RoomsController;