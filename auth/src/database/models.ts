import {
    Model,
    Table,
    DataType,
    Column,
    AllowNull,
} from "sequelize-typescript";

@Table({
    tableName: "Users",
    timestamps: false,
})
class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    })
    id?: number;
    @Column({
        type: DataType.STRING(255),
        field: "username",
    })
    username?: string;
    @Column({
        type: DataType.STRING(255),
        field: "password",
    })
    password?: string;
}
export { User };
