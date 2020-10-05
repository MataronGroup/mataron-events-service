import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {Router} from "./Controllers/Router";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: Router[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors({origin: '*'}));
    }

    private initializeControllers(controllers: Router[]) {
        controllers.forEach((controller: Router) => {
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