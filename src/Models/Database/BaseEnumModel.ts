import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";


@Table({tableName:"BaseEnum",timestamps: false})
export default class BaseEnumModel extends Model<BaseEnumModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    ID: number;

    @Column
    BaseName: string;
}