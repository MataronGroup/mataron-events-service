import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import {validate} from "express-jsonschema";
import jobSchemas from "../Configuration/JsonSchemas/JobControllerSchemas";

class JobsController implements Controller {
    path: string;
    router: express.Router;
    db: Sequelize;
    schema: object;

    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/jobs";
        this.router = express.Router();
        this.schema = jobSchemas.basicBody
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getJobs.bind(this));
        this.router.post(`${this.path}`,validate({body: this.schema}), this.createJobs.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteJobs.bind(this));
    }

    private async getJobs(req: express.Request, res: express.Response) {
        await this.db.models.JobsTableModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async createJobs(req: express.Request, res: express.Response) {
        const type = req.body.Type;
        await this.db.models.JobsTableModel.findOne({where : {Type : type}})
            .then(async r => {
                if (r){
                    res.status(409).send(new ErrorResponse(`The job with name already exist ${type}`));
                }
                else {
                    await this.db.models.JobsTableModel.create({
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

    private async deleteJobs(req: express.Request, res: express.Response) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        console.log(id)
        await this.db.models.JobsTableModel.findByPk(id)
            .then(async r => {
                if (r){
                    await this.db.models.JobsTableModel.destroy({where : {
                        ID : id,
                        }}).then(responeDelete => {
                            res.status(201).send(r)
                    }).catch(errorDelete => {
                        res.status(500).send(new ErrorResponse(errorDelete));
                    })
                }
                else {
                    res.status(404).send(new ErrorResponse(`The job with id already exist ${id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default JobsController;