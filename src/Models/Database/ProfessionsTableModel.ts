import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Profession",timestamps: false})
class ProfessionsTableModel extends Model<ProfessionsTableModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    ID: number;

    @Column
    Type: string;
}

export default ProfessionsTableModel;