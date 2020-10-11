import {AutoIncrement, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import RoomsTableModel from "./RoomsTableModel";

@Table({tableName:"Base",timestamps: false})
class BaseTableController extends Model<BaseTableController>
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

export default BaseTableController;