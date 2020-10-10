import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Event",timestamps: false})
class UsersModel extends Model<UsersModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    PersonalID: number;

    @Column
    UserID: string;

    @Column
    Name: string;

    @Column
    Job: number;

    @Column
    Professiom: number;

    @Column
    CardId: number;

    @Column({field: "Phone_Number"})
    PhoneNumber: number;

    @Column
    Address: string;

    @Column({field: "Type_Of_Service"})
    TypeOfService: string;

    @Column
    Rank: string;

    @Column({field: "C_In_Charge"})
    CInCharge: string;

    @Column
    Gender: string;






}

export default UsersModel;