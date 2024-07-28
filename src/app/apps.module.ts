import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './model/task.model';
import { TasktagController } from './task-tag/tasktag.controller';
import { TaskTag } from './model/taskTag.model';
import { TasktagService } from './task-tag/tasktag.service';
import { TagController } from './tag/tag.controller';
import { Tag } from './model/tag.model';
import { TagService } from './tag/tag.service';

@Module({
  imports: [SequelizeModule.forFeature([Task, TaskTag, Tag])],
  controllers: [TaskController, TasktagController, TagController],
  providers: [TaskService, TasktagService, TagService],
})
export class AppsModule {}
