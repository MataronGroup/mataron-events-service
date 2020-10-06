import {AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";

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
}

export default BaseTableController;