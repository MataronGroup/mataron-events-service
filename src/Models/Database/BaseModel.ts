import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import RoomsTableModel from "./RoomsTableModel";

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

    @HasMany(() => RoomsTableModel)
    Rooms : RoomsTableModel[]
}

export default BaseModel;