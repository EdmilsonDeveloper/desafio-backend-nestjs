import { Module } from '@nestjs/common';
import { TasktagService } from './tasktag.service';
import { TasktagController } from './tasktag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskTag } from './taskTag.model';

@Module({
  imports: [SequelizeModule.forFeature([TaskTag])],
  controllers: [TasktagController],
  providers: [TasktagService],
})
export class TasktagModule {}
