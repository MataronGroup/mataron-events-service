import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"NetworkToStandTemplates",timestamps: false})
class NetworkToStandTemplatesModel extends Model<NetworkToStandTemplatesModel>
{
   
    @Column
    StandID: number;

    @Column
    NetworkID: number;


}

export default NetworkToStandTemplatesModel;