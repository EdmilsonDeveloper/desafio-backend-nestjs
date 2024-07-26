import { Module } from '@nestjs/common';
import { TaskTag } from './taskTag.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([TaskTag])],
})
export class TaskTagModule {}
