import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { TasktagModule } from './tasktag/tasktag.module';

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
    TagModule,
    TaskModule,
    UserModule,
    TasktagModule,
    ],
    exports:[SequelizeModule]
})
export class AppModule {}
