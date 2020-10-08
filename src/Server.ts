import App from "./App";
import RoomsController from "./Controllers/RoomsController";
import DBConnection from "./Common/DBConnection";
import {server} from "./Configuration/AppConfiguration.json";
import ArenaController from "./Controllers/ArenaController";
import BaseController from "./Controllers/BaseController";
import JobsController from "./Controllers/JobsController";
import ProfessionsController from "./Controllers/ProfessionsController";


const db = DBConnection;
const app = new App(
    [
        new RoomsController(db),
        new ArenaController(db),
        new BaseController(db),
        new JobsController(db),
        new ProfessionsController(db)
    ],
    server.port,
);

app.listen();