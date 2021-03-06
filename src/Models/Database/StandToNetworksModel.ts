import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"StandToNetworks",timestamps: false})
class StandToNetworksModel extends Model<StandToNetworksModel>
{
    @PrimaryKey
    @Column
    StandID: number;

    @PrimaryKey
    @Column
    NetworksID: number;
}

export default StandToNetworksModel