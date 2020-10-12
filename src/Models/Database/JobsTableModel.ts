import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Jobs",timestamps: false})
class JobsTableModel extends Model<JobsTableModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    ID: number;

    @Column
    Type: string;
}

export default JobsTableModel;