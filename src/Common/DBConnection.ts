import {Sequelize} from "sequelize-typescript";
import RoomsTableModel from "../Models/Database/RoomsTableModel";
import {dbconnection} from "../Configuration/AppConfiguration.json";

const DBConnection =
      new Sequelize(dbconnection.database, dbconnection.username, dbconnection.password, {
          host: dbconnection.host,
          dialect: dbconnection.dialect as "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb" | undefined,
          models: [
              RoomsTableModel
          ]
      });

export default DBConnection;
