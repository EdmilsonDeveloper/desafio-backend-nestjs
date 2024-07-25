import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.entity";


@Table({
    tableName: "task",
    freezeTableName: true,
})
export class Task extends Model {
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
    title: string

    @Column({
        type: DataType.TEXT
    })
    status: string
    
    @Column({
        type: DataType.TEXT
    })
    description: string
    
    @Column({
        type: DataType.INTEGER
    })
    priority: number

    @Column({
        type: DataType.DATE
    })
    expirationDate: Date

    @Column({
        type: DataType.TEXT,
        references: { model: User, key: "id" },
    })
    userId: number;
}