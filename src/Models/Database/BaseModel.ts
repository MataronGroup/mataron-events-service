import {AutoIncrement, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import RoomsTableModel from "./RoomsTableModel";
import EventsModel from "./EventsModel";

@Table({tableName:"Base",timestamps: false})
class BaseModel extends Model<BaseModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    BaseID: number;

    @Column
    Name: string;

    @Column
    ArenaID: number;

    @ForeignKey(() => EventsModel)
    @Column
    EventId: number;

    @HasMany(() => RoomsTableModel)
    Rooms : RoomsTableModel[]
}

export default BaseModel;