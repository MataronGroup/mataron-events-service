import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Rooms",timestamps: false})
class RoomsTableModel extends Model<RoomsTableModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    RoomsID: number;

    @Column
    Name: string;

    @Column
    BaseID: number;

    @Column
    EventID: number;
}

export default RoomsTableModel;