import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Cell",timestamps: false})
class BoxModel extends Model<BoxModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    CellID: number;

    @Column
    Name: string;

    @Column
   RoomsID: number;
}

export default BoxModel