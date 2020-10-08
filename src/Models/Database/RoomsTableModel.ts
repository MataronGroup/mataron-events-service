import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import BaseTableController from "./BaseTableController";

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

    @ForeignKey(() =>BaseTableController)
    @Column
    EventID: number;

    @BelongsTo(() => BaseTableController)
    bases : BaseTableController
}

export default RoomsTableModel;