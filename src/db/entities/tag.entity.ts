import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.entity";


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
        type: DataType.TEXT
    })
    name: string
    
    @Column({
        type: DataType.TEXT
    })
    color: string

    @Column({
        type: DataType.TEXT,
        references: { model: User, key: "id" },
    })
    userId: number;
}