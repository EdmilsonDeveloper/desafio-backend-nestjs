import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.entity";


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
        type: DataType.TEXT
    })
    token: string

    @Column({
        type: DataType.TEXT,
        references: { model: User, key: "id" },
    })
    userId: string
}