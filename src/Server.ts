import App from "./App";
import RoomsController from "./Controllers/RoomsController";
import DBConnection from "./Common/DBConnection";

const db = DBConnection;
const app = new App(
    [
        new RoomsController(db)
    ],
    5000,
);

app.listen();