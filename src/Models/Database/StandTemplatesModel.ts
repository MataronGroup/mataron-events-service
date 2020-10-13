import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Templates",timestamps: false})
class StandTemplatesModel extends Model<StandTemplatesModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    ID: number;

    @Column
    X: string;

    @Column
    Y: string;

    @Column
    JobID: number;

    @Column
    TemplateID: number;


}

export default StandTemplatesModel;