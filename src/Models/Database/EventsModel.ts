import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName:"Event",timestamps: false})
class EventsModel extends Model<EventsModel>
{
    @PrimaryKey
    @AutoIncrement
    @Column
    EventID: number;

    @Column
    Name: string;

    @Column
    ArenaID: number;
}

export default EventsModel;