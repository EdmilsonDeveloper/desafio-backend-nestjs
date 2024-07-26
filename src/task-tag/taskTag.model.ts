import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"


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
}

