import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TagModule } from './tag/tag.module';

@Module({
  imports:[
    SequelizeModule.forRoot({
      dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'admin',
            database: process.env.DB_DATABASE || 'desafio_backend',
            autoLoadModels: true,
            synchronize: true,
    }),
    TaskModule,
    TagModule,],
    exports:[SequelizeModule]
})
export class AppModule {}
