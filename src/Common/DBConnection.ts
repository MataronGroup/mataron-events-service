import {Sequelize} from "sequelize-typescript";
import {dbconnection} from "../Configuration/AppConfiguration.json";
import EventsModel from "../Models/Database/EventsModel"
import BoxModel from "../Models/Database/BoxModel";
import RoomsTableModel from "../Models/Database/RoomsTableModel";



const DBConnection =
      new Sequelize(dbconnection.database, dbconnection.username, dbconnection.password, {
          host: dbconnection.host,
          dialect: dbconnection.dialect as "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb" | undefined,
          models: [
              RoomsTableModel,
              BoxModel,
              EventsModel,

          ]
      });

export default DBConnection;
