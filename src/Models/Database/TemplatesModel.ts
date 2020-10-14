import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Templates",timestamps: false})
class TemplatesModel extends Model<TemplatesModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    ID: number;

    @Column
    Name: string;


}

export default TemplatesModel;