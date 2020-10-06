import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Controller} from "./Common/Controller";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeMiddlewaresAfterControllers();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors({origin: '*'}));
    }

    private initializeMiddlewaresAfterControllers() {
        this.app.use(this.jsonSchemaValidationError);
    }

    private jsonSchemaValidationError(err: any, req: any, res: any, next: any) {
            let responseData;
            if (err.name === 'JsonSchemaValidation') {
                res.status(400);

                responseData = {
                    statusText: 'Bad Request',
                    jsonSchemaValidation: true,
                    validations: err.validations
                };

                if (req.xhr || req.get('Content-Type') === 'application/json') {
                    res.json(responseData);
                } else {
                    res.render('badrequestTemplate', responseData);
                }
            } else {
                next(err);
            }
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log(`App listening on the port ${this.port}`);
        });
    }

}

export default App;