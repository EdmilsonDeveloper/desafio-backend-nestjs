import { Module } from '@nestjs/common';
import { TaskTagModule } from './Task&Tag/tasktag.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './Task&Tag/user/user.module';

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
    TaskTagModule,
    UserModule,
    ],
    exports:[SequelizeModule]
})
export class AppModule {}
