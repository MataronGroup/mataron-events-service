import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import {validate} from "express-jsonschema";
import schemas from "../Configuration/JsonSchemas/RoomsControllerSchemas";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";


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
        this.schema = schemas.basicBody;

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, validate({body: this.schema}), this.createRoom.bind(this));
        this.router.get(`${this.path}/:id`, this.getRoom.bind(this));
        this.router.put(`${this.path}/:id`,validate({body: this.schema}), this.updateRoom.bind(this));
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
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }

    private async getRoom(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findByPk(req.params.id)
            .then(r => {
               if(r) {
                   res.send(r);
               }
               else {
                   res.status(404).send(new ErrorResponse(`cannot find room id ${req.params.id}`))
               }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }

    private async updateRoom(req: express.Request, res: express.Response) {
        await this.db.models.RoomsTableModel.findByPk(req.params.id)
            .then( r => {
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
                        .then(updateResult => {
                            res.send(updateResult);
                        })
                        .catch(e => {
                           res.status(500).send(new ErrorResponse(e.original.message));
                        });
                }
                else {
                    res.status(404).send(new ErrorResponse(`cannot find room id ${req.params.id}`));
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
                    res.status(404).send(new ErrorResponse(`cannot find room id ${req.params.id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse("error"));
            });
    }
}

export default RoomsController;