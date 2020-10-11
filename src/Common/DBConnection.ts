import {Sequelize} from "sequelize-typescript";
import {dbconnection} from "../Configuration/AppConfiguration.json";
import EventsModel from "../Models/Database/EventsModel"
import BoxModel from "../Models/Database/BoxModel";
import RoomsTableModel from "../Models/Database/RoomsTableModel";
import ArenaTableModel from "../Models/Database/ArenaTableModel";
import JobsTableModel from "../Models/Database/JobsTableModel";
import ProfessionsTableModel from "../Models/Database/ProfessionsTableModel";
import StandModel from "../Models/Database/StandModel";
import UsersModel from "../Models/Database/UsersModel";
import BaseModel from "../Models/Database/BaseModel";
import BaseToEventModel from "../Models/Database/BaseToEventModel";
import NetworkModel from "../Models/Database/NetworkModel";






const DBConnection =
      new Sequelize(dbconnection.database, dbconnection.username, dbconnection.password, {
          host: dbconnection.host,
          dialect: dbconnection.dialect as "mssql" | "mysql" | "postgres" | "sqlite" | "mariadb" | undefined,
          models: [
              ArenaTableModel,
              JobsTableModel,
              ProfessionsTableModel,
              RoomsTableModel,
              BoxModel,
              EventsModel,
              StandModel,
              UsersModel,
              BaseModel,
              NetworkModel,
              BaseToEventModel


          ]
      });

export default DBConnection;
