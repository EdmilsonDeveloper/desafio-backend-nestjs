import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";


@Table({
    tableName: "session",
    freezeTableName: true,
})
export class Session extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true
    })
    id: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    token: string
}