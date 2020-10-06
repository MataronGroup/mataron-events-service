import {Sequelize} from "sequelize-typescript";
import RoomsTableModel from "../Models/Database/RoomsTableModel";
import {dbconnection} from "../Configuration/AppConfiguration.json";
import ArenaTableModel from "../Models/Database/ArenaTableModel";
import BaseTableController from "../Models/Database/BaseTableController";

const DBConnection =
      new Sequelize(dbconnection.database, dbconnection.username, dbconnection.password, {
          host: dbconnection.host,
          dialect: dbconnection.dialect as "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb" | undefined,
          models: [
              RoomsTableModel,
              ArenaTableModel,
              BaseTableController
          ]
      });

export default DBConnection;
