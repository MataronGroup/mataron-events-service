import {Sequelize} from "sequelize-typescript";
import RoomsTableModel from "../Models/Database/RoomsTableModel";

const DBConnection =
      new Sequelize('mataron', 'mataron', 'thelittlecitizen', {
          host: '10.1.0.117',
          dialect: 'mssql',
          models: [
              RoomsTableModel
          ]
      });

export default DBConnection;
