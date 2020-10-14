import {AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"NetworkToStandTemplates",timestamps: false})
class NetworkToStandTemplatesModel extends Model<NetworkToStandTemplatesModel>
{
    @PrimaryKey
    @Column
    StandID: number;

    @PrimaryKey
    @Column
    NetworkID: number;


}

export default NetworkToStandTemplatesModel;