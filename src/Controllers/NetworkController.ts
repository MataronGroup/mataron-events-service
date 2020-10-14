import express from "express";
import {Controller} from "../Common/Controller";
import {Sequelize} from "sequelize-typescript";
import ErrorResponse from "../Models/Api/Responses/ErrorResponse";
import {validate} from "express-jsonschema";
import networkSchemas from "../Configuration/JsonSchemas/NetworkControllerSchemas";

class NetworkController implements Controller
{
    path: string;
    router: express.Router;
    db: Sequelize;
    schema : object
    constructor(db: Sequelize) {
        this.db = db;
        this.path = "/Network";
        this.router = express.Router();
        this.schema = networkSchemas.basicBody

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getNetwork.bind(this));
        this.router.post(`${this.path}`, validate({body: this.schema}),this.createNetwork.bind(this));
        this.router.delete(`${this.path}/:id`, this.deleteNetwork.bind(this));

    }

    private async getNetwork(req: express.Request, res: express.Response) {

        await this.db.models.NetworkModel.findAll()
            .then(r => {
                res.send(r);
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }

    private async createNetwork(req: express.Request, res: express.Response) {
        const type = req.body.Type;
        await this.db.models.NetworkModel.findOne({where : {Type : type}})
            .then(async r => {
                if (r){
                    res.status(409).send(new ErrorResponse(`The network with name already exist ${type}`));
                }
                else {
                    await this.db.models.NetworkModel.create({
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

    private async deleteNetwork(req: express.Request, res: express.Response) {
        // tslint:disable-next-line:radix
        const id = parseInt(req.params.id);
        console.log(id)
        await this.db.models.NetworkModel.findByPk(id)
            .then(async r => {
                if (r){
                    await this.db.models.NetworkModel.destroy({where : {
                            NetworksID : id,
                        }}).then(responeDelete => {
                        res.status(201).send(r)
                    }).catch(errorDelete => {
                        res.status(500).send(new ErrorResponse(errorDelete));
                    })
                }
                else {
                    res.status(404).send(new ErrorResponse(`The network with id already exist ${id}`));
                }
            })
            .catch(e => {
                res.status(500).send(new ErrorResponse(e));
            })
    }
}

export default NetworkController;