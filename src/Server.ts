import App from "./App";
import RoomsController from "./Controllers/RoomsController";
import DBConnection from "./Common/DBConnection";
import {server} from "./Configuration/AppConfiguration.json";
import ArenaController from "./Controllers/ArenaController";


const db = DBConnection;
const app = new App(
    [
        new RoomsController(db),
        new ArenaController(db)
    ],
    server.port,
);

app.listen();