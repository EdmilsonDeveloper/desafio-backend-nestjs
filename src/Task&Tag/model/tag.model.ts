import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Task } from "./task.model";
import { TaskTag } from "./taskTag.model";


@Table({
    tableName: "tag",
    freezeTableName: true,
})
export class Tag extends Model {
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
    name: string
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    color: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    userId: string

    @BelongsToMany(() => Task, () => TaskTag)
    tasks: Task[]
}