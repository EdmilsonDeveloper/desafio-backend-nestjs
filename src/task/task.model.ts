import { DataTypes } from "sequelize";
import { Column, DataType, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";


@Table({
    tableName: "task",
    freezeTableName: true,
})
export class Task extends Model<Task> {
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
        type: DataType.TEXT,
        defaultValue: 'In Progress',
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
        type: DataType.DATEONLY
    })
    expirationDate: Date

    // @Column({
    //     type: DataType.TEXT,
    //     references: { model: User, key: "id" },
    // })
    // userId: string; 
}
