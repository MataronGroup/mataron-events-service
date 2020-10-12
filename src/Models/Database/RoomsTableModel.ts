import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import BaseModel from "./BaseModel";

@Table({tableName:"Rooms",timestamps: false})
class RoomsTableModel extends Model<RoomsTableModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    RoomsID: number;

    @Column
    Name: string;

    @Column
    BaseID: number;

    @ForeignKey(() =>BaseModel)
    @Column
    EventID: number;

    @BelongsTo(() => BaseModel)
    bases : BaseModel

}

export default RoomsTableModel;