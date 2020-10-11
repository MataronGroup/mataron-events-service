import App from "./App";
import RoomsController from "./Controllers/RoomsController";
import EventController from "./Controllers/EventController";

import DBConnection from "./Common/DBConnection";
import {server} from "./Configuration/AppConfiguration.json";
import ArenaController from "./Controllers/ArenaController";
import BaseController from "./Controllers/BaseController";
import JobsController from "./Controllers/JobsController";
import NetworkController from "./Controllers/NetworkController";

import ProfessionsController from "./Controllers/ProfessionsController";
import StatisticsController from "./Controllers/StatisticsController";


const db = DBConnection;
const app = new App(
    [
        new ArenaController(db),
        new BaseController(db),
        new JobsController(db),
        new ProfessionsController(db),
        new RoomsController(db),
        new EventController(db),
        new NetworkController(db),

        new StatisticsController(db)
    ],
    server.port
);

app.listen();