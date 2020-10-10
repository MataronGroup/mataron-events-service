import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

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
}

export default BaseModel;