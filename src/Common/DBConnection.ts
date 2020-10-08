import {Sequelize} from "sequelize-typescript";
import RoomsTableModel from "../Models/Database/RoomsTableModel";
import {dbconnection} from "../Configuration/AppConfiguration.json";
import ArenaTableModel from "../Models/Database/ArenaTableModel";
import BaseTableController from "../Models/Database/BaseTableController";
import JobsController from "../Controllers/JobsController";
import JobsTableModel from "../Models/Database/JobsTableModel";
import ProfessionsTableModel from "../Models/Database/ProfessionsTableModel";

const DBConnection =
      new Sequelize(dbconnection.database, dbconnection.username, dbconnection.password, {
          host: dbconnection.host,
          dialect: dbconnection.dialect as "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb" | undefined,
          models: [
              RoomsTableModel,
              ArenaTableModel,
              BaseTableController,
              JobsTableModel,
              ProfessionsTableModel
          ]
      });

export default DBConnection;
