import { ConfigService } from "@nestjs/config"
import { Sequelize } from "sequelize-typescript"
import { Task } from "./entity/task.entity";
require('dotenv').config();

export const dbProviders = [{
    provide: 'SEQUELIZE',
    useFactory: async() => {
        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
        sequelize.addModels([Task]);
        await sequelize.sync();
        return sequelize;
    }
}]