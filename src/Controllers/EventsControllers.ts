import express from "express";
import {Router} from "./Router";
import {validate} from "express-jsonschema";
import {Sequelize} from "sequelize-typescript";
import EventsModel from "../Models/Database/EventsModel";
import {Controller} from "../Common/Controller";



export class PostEvent implements Controller {

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
        // this.router.get(`${this.path}/:id`, this.getEvent.bind(this));
        // this.router.put(`${this.path}/:id`,validate({body: this.schema}), this.updateEvent.bind(this));
        // this.router.delete(`${this.path}/:id`, this.deleteEvent.bind(this));
    }

    private async createEvent(req: express.Request, res: express.Response) {

        await this.db.models.EventModel.create({
            Aerna: req.body.Aerna,
            BaseID: req.body.Base,
            RoomId: req.body.Room,
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




    // createPost (req: express.Request, res: express.Response)
    // {
    //     const arenaType = req.body.arenaType;
    //     const baseType = req.body.baseType;
    //     const roomType = req.body.roomType;
    //     const boxType = req.body.boxType;
    //     const soldiersType = req.body.soldiersType;
    //     const positionType = req.body.positionType;


    //     if (arenaType !=="number" && arenaType.length === 0)
    //     {
    //         res.status(400).send("missing fields");
    //     }
    //     res.status(200).send("TIL");

    //     if(baseType !=="number" && arenaType.length === 0)
    //     {
    //         res.status(400).send("missing fields");

    //     }
    //     res.status(200).send("TIL");

    //     if(baseType !=="number" && arenaType.length === 0)
    //     {
    //         res.status(400).send("missing fields");

    //     }
    //     res.status(200).send("TIL");

    //     if(baseType !=="number" && arenaType.length === 0)
    //     {
    //         res.status(400).send("missing fields");

    //     }
    //     res.status(200).send("TIL");

    //     if(baseType !=="number" && arenaType.length === 0)
    //     {
    //         res.status(400).send("missing fields");

    //     }
    //     res.status(200).send("TIL");





      
      


  
    // }

}




