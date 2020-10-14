import express from "express";
import { Controller } from "../Common/Controller";
import { Sequelize } from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";

class TemplatesController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/templates";
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAllTemplates.bind(this));
        this.router.get(`${this.path}/:id`, this.getAllByTemplate.bind(this));
        this.router.post(`${this.path}`, this.createTemplate.bind(this));

    }

    private async getAllTemplates(req: express.Request, res: express.Response) {

        await this.db.models.TemplatesModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async getAllByTemplate(req: express.Request, res: express.Response) {
        await this.db.models.StandTemplatesModel.findByPk(req.params.id)
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

            await this.db.models.NetworkToStandTemplatesModel.findByPk(req.params.id)
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
    private async createTemplate(req: express.Request, res: express.Response) {
        const template: any = await this.db.models.TemplatesModel.create({
            Name: req.body.Name }).then (p=> p.toJSON());

        for (let o= 0; o< req.body.stands.length; o++)
        {
            console.log(o)

            const stend: any = await this.db.models.StandTemplatesModel.create({
                TemplateID: template.ID,
                X: req.body.stand[o].X,
                Y: req.body.stand[o].Y,
                JobID: req.body.stand[o].JobID,

            }).then (h => h.toJSON());

            for (let u=0; u< req.body.stands[o].networks.length; u ++)
            {
                console.log(u)
                const network : any = await this.db.models.NetoekTOStandTemplatesModel.create({

                    StandID: stend.ID,
                    NetworkID: req.body.stands[o].network[u]
                })
            }

        }



    }
}



export default TemplatesController;