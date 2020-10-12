import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import {validate} from "express-jsonschema";
import professionSchemas from "../Configuration/JsonSchemas/ProfessionControllerSchemas";

class ProfessionsController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/professions";
        this.router = express.Router();
        this.schema = professionSchemas.basicBody
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getJobs.bind(this));
        this.router.post(`${this.path}`, validate({body: this.schema}),this.createProfession.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteProfession.bind(this));
    }

    private async getJobs(req: express.Request, res: express.Response) {
        await this.db.models.ProfessionsTableModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async createProfession(req: express.Request, res: express.Response) {
        const type = req.body.Type;
        await this.db.models.ProfessionsTableModel.findOne({where : {Type : type}})
            .then(async r => {
                if (r){
                    res.status(409).send(new ErrorResponse(`The profession with name already exist ${type}`));
                }
                else {
                    await this.db.models.ProfessionsTableModel.create({
                        Type : type
                    }).then(responeCreate => {
                        res.send(responeCreate)
                    }).catch(errorCreate => {
                        res.send(errorCreate)
                    })
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async deleteProfession(req: express.Request, res: express.Response) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        console.log(id)
        await this.db.models.ProfessionsTableModel.findByPk(id)
            .then(async r => {
                if (r){
                    await this.db.models.ProfessionsTableModel.destroy({where : {
                            ID : id,
                        }}).then(responeDelete => {
                        res.status(201).send(r)
                    }).catch(errorDelete => {
                        res.status(500).send(new ErrorResponse(errorDelete));
                    })
                }
                else {
                    res.status(404).send(new ErrorResponse(`The profession with id already exist ${id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default ProfessionsController;