import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Stand",timestamps: false})
class StandModel extends Model<StandModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    StandID: number;

    @Column
    CellName: string;

    @Column
    RoomsID: number;

    @Column
    X: string;

    @Column
    Y:string;

    @Column
    DayUserID:string;

    @Column
    NightUserID:string;





}

export default StandModel;