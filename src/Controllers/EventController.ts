import { json } from "body-parser";
import express from "express";
import { validate } from "express-jsonschema";
import { type } from "os";
import { Sequelize } from "sequelize-typescript";
import { JSON } from "sequelize/types";
import { Json } from "sequelize/types/lib/utils";
import { Controller } from "../Common/Controller";
// import schemas from "../Configuration/JsonSchemas/EventsControllerSchemas";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import RoomsTableModel from "../Models/Database/RoomsTableModel";



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
                ArenaId: {
                    type: 'number',
                    required: true
                },
                BaseId: {
                    type: 'number',
                    required: true
                },
                RoomId: {
                    type: 'number',
                    required: true
                },
                Box: {
                    type: 'number',
                    required: true
                },


                // Soldiers: {
                //     type: 'array',
                //     required: true,
                //     items: [{type: "object",
                //     properties: {
                //         Id: {
                //             type: "number",
                //             required: true
                //         },
                //         Cell:{
                //             typr:'number',
                //             required: true

                //         }}
                //     }]
                // }




            }
        });
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createEvent.bind(this));
        this.router.get(`${this.path}/:id`, this.getEvent.bind(this));
        this.router.get(`${this.path}`, this.getEvents.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteEvent.bind(this));
        // this.router.put(`${this.path}/:id`, this.updateEvent.bind(this));

    }

    private async createEvent(req: express.Request, res: express.Response) {
        const event: any = await this.db.models.EventsModel.create({
            ArenaID: req.body.ArenaId,
            Name: req.body.Name,

        }).then(r => r.toJSON());


        for (let i = 0; i < req.body.bases.length; i++) {
            console.log(i)

            for (let k = 0; k < req.body.bases[i].room.length; k++) {
                console.log(k);

                const room : any = await this.db.models.RoomsTableModel.create({
                    Name: req.body.bases[i].room[k].Name,
                    BaseID: req.body.bases[i].BaseId,
                    EventID: event.EventID
                }).then(r => r.toJSON());

                for (let m = 0; m < req.body.bases[i].room[k].stands.length; m++) {
                    console.log(m)

                    // const standModel = await this.db.models.StandModel.create({
                    //     RoomsID: room.RoomsID,
                    //     X: req.body.bases[i].room[k].stands[m].x,
                    //     Y: req.body.bases[i].room[k].stands[m].y


                    // })


                    // for(let soldier of req.body.bases[i].room[k].stands[m].soldiers){
                    //     await this.db.models.StandModel.create({
                    //         DayUserID: soldier,
                    //         NightUserID: soldier
                    //     })

                    //         .then(r => {
                    //             res.send(r);
                    //         })
                    //         .catch(e => {
                    //             res.status(500).send(e.original.message);
                    //         });
                    // }

                    for (let n = 0; n < req.body.bases[i].room[k].stands[m].soldiers.length; n++) {
                        console.log(n)


                        const stand = await this.db.models.StandModel.create({
                            DayUserID: req.body.bases[i].room[k].stands[m].soldiers[n].DaySoldier,
                            NightUserID: req.body.bases[i].room[k].stands[m].soldiers[n].NightSoldier,
                            RoomsID: room.RoomsID,
                            X: req.body.bases[i].room[k].stands[m].x,
                            Y: req.body.bases[i].room[k].stands[m].y

                        })
                        // console.log('stand:')
                        // console.log(stand)

                            // .then(r => {
                            //     res.send(r);
                            // })
                            // .catch(e => {
                            //     res.status(500).send(e.original.message);
                            // });

                    }
                }
            }
        }

    }

    private async getEvent(req: express.Request, res: express.Response) {
        await this.db.models.EventsModel.findByPk(req.params.id)
            .then(r => {
                if (r) {
                    res.send(r);
                }
                else {
                    res.status(404).send(new ErrorResponse(`cannot find event id ${req.params.id}`))
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }

    private async getEvents(req: express.Request, res: express.Response) {
        await this.db.models.EventsModel.findAll()
            .then(r => {
                res.send(r);


            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e.original.message));
            });
    }



    private async deleteEvent(req: express.Request, res: express.Response) {
        console.log(this.db.models)
        await this.db.models.EventsModel.destroy({
            where: {
                EventID: req.params.id
            }

        })
            .then(r => {
                if (r === 1) {
                    res.send({ status: "successful" });
                }
                else {
                    res.status(404).send(new ErrorResponse(`cannot find room id ${req.params.id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse("error"));
            });



    }
    // private async updateEvent(req: express.Request, res: express.Response) {
    //     console.log(this.db.models)

    //     await this.db.models.EventsModel.findByPk(req.params.id)

    //         .then(async r => {
    //             if(r)
    //             {
    //                 for( let i =0; i< req.body.bases.length; i++)
    //                 {
    //                     for(let k = 0; i<req.body.bases[i].room.length; k++)
    //                     {const a = (onselect RoomID; from RoomsTableModel)
    //                         await this.db.models.RoomsTableModel.update({
    //                             Name: req.body.bases[i].room[k].Name,
    //                             BaseID: req.body.bases[i].BaseId
    //                         }, {where:{RoomID: })


    //                         for( let m =0; i<req.body.bases[i].room[k].stands.length; m ++)
    //                         {
    //                             await this.db.models.StandModel.update({
    //                                 RoomID: req.body.bases[i].room[k].stands[m].RoomsTableModel,
    //                                 X: req.body.bases[i].room[k].stands[m].x,
    //                                 Y:req.body.bases[i].room[k].stands[m].y}, {where:{EventID: req.params.id}})


    //                             for(let n = 0; i<req.body.bases[i].room[k].stands[m].soldiers.length; n ++ )
    //                             {
    //                                 await this.db.models.StandModel.update({
    //                                     DayUserID: req.body.bases[i].room[k].stands[m].soldiers[n],
    //                                     NightUserID: req.body.bases[i].room[k].stands[m].soldiers[n]}, {where:{EventID: req.params.id}})

    //                             }

    //                         }

    //                     }


    //                 }
    //             }

    //         })

    // }




}

export default EventController;



