import express from "express";
import {validate} from "express-jsonschema";
import {Sequelize} from "sequelize-typescript";
import {Controller} from "../Common/Controller";
// import schemas from "../Configuration/JsonSchemas/EventsControllerSchemas";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";



class EventController implements Controller {

    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/events";
        this.router = express.Router();
        this.schema = this.initializeSchema();

        this.initializeRoutes();

    }

    private initializeSchema() {
        return ({
            type: 'object',
            properties: {
                Arena: {
                    type: 'number',
                    required: true
                },
                Base: {
                    type: 'number',
                    required: true
                },
                Room: {
                    type: 'number',
                    required: true
                },
                Box: {
                    type: 'number',
                    required: true
                },
                Soldiers: {
                    type: Array,
                    required: true
                }

            }
        });
    }

    private initializeRoutes() {
        this.router.post(this.path, validate({body: this.schema}), this.createEvent.bind(this));
    }

    private async createEvent(req: express.Request, res: express.Response) {

        await this.db.models.EventsModel.create({
            ArenaId: req.body.Aerna,
            BaseID: req.body.Base,
            RoomId: req.body.Room,
            Name: req.body.Name,
            BoxId:req.body.Box,
            Soldiers:req.body.Soldiers
        })
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(e.original.message);
            });
    }







}

export default EventController;



