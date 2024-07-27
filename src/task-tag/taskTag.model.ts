import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Tag } from "src/tag/tag.model"
import { Task } from "src/task/task.model"


@Table({
    tableName: "tasktag",
    freezeTableName: true,
})
export class TaskTag extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        unique: true
    })
    id: string

    @ForeignKey(() => Task)
    @Column
    taskId: string

    @ForeignKey(() => Tag)
    @Column
    tagId: string
}

