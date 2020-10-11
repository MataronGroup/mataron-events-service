import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"BaseToEvent",timestamps: false})
class BaseToEventModel extends Model<BaseToEventModel>
{
    @Column
    BaseID: number;

    @Column
    EventID: number;

}

export default BaseToEventModel