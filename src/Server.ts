import App from "./App";
import RoomsController from "./Controllers/RoomsController";
import DBConnection from "./Common/DBConnection";
import {server} from "./Configuration/AppConfiguration.json";


const db = DBConnection;
const app = new App(
    [
        new RoomsController(db)
    ],
    server.port,
);

app.listen();