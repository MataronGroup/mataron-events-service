import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import {validate} from "express-jsonschema";
import baseEnumSchemas from "../Configuration/JsonSchemas/BaseEnumControllerSchemas";

export default  class BaseEnumController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;
    schema : object
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/baseEnum";
        this.router = express.Router();
        this.schema = baseEnumSchemas.basicBody
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAllBasesEnum.bind(this));
        this.router.post(`${this.path}`,validate({body: this.schema}), this.createBaseEnum.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteBaseEnum.bind(this));

    }

    private async getAllBasesEnum(req: express.Request, res: express.Response) {

        await this.db.models.BaseEnumModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async createBaseEnum(req: express.Request, res: express.Response) {
        const type = req.body.BaseName;
        const arenaId = req.body.ArenaID;
        await this.db.models.BaseEnumModel.findOne({where : {BaseName : type}})
            .then(async r => {
                if (r){
                    res.status(409).send(new ErrorResponse(`The arena with name already exist ${type}`));
                }
                else {
                    await this.db.models.BaseEnumModel.create({
                        BaseName : type,
                        ArenaID : arenaId
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

    private async deleteBaseEnum(req: express.Request, res: express.Response) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        console.log(id)
        await this.db.models.BaseEnumModel.findByPk(id)
            .then(async r => {
                if (r){
                    await this.db.models.BaseEnumModel.destroy({where : {
                            ID : id,
                        }}).then(responeDelete => {
                        res.status(201).send(r)
                    }).catch(errorDelete => {
                        res.status(500).send(new ErrorResponse(errorDelete));
                    })
                }
                else {
                    res.status(404).send(new ErrorResponse(`The arena with id already exist ${id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}