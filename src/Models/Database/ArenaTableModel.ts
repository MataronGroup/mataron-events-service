import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Arena",timestamps: false})
class ArenaTableModel extends Model<ArenaTableModel>
{
    @AutoIncrement
    @PrimaryKey
    @Column
    Id: number;

    @Column
    Type: string;
}

export default ArenaTableModel;