import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Networks",timestamps: false})
class NetworkModel extends Model<NetworkModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    NetworksID: number;

    @Column
    Type: string





}

export default NetworkModel;